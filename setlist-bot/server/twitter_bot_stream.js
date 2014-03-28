Meteor.startup(function () {
	var Fiber = Npm.require('fibers');
	var twit = new TwitMaker({
		consumer_key: '',
		consumer_secret: '',
		access_token: '',
		access_token_secret: ''
	});

	var stream = twit.stream('user');

	stream.on('tweet', function(tweet) {
		var message = tweet.text;
		var username = tweet.user.screen_name;
		var userId = tweet.user.id;
		console.log(username + ' - ' + userId + ' - ' + message);

		Fiber(function() {
			var artist = message.replace('@GiveMeSetlist ', '');
			var setList = setlistGrabber(artist);
			var r = new SpotifyRequest();
			var trackIds = r.getTrackIds(artist, setList);
			var url = 'http://open.spotify.com/trackset/' + artist.replace(' ', '%20') + '/' + _.without(trackIds, null, undefined, '').join();
			//var url = 'https://embed.spotify.com/?uri=spotify:trackset:' + artist.replace(' ', '+') + ':' + _.without(trackIds, null, undefined, '').join();
			console.log('@' + username + ' ' + url);
			twit.post('statuses/update', { status: '.@' + username + ' here\'s your playlist for ' + artist + ' ' + url }, function(err, reply) {
				if (!!err) {
					console.error(err);
				}
				console.log(reply);
			});
		}).run();
	});
});
