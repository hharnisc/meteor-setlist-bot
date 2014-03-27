Meteor.startup(function () {
	var twit = new TwitMaker({
		consumer_key: 'pBJNl66PvHCohDuDrGJHHQ',
		consumer_secret: 'VUxZATtOrl5bysyOHWL1SGauEVFDwps3FRqPBVbLAo8',
		access_token: '2414934799-zXagfuiEnnizSA0ZlEKuXzOC4Rc0VPE6an7j1o6',
		access_token_secret: 'iI78v8gFbDS0PfnKuLn2s73GZLvgcvL1ulv4wiD6tlEyf'
	});

	var stream = twit.stream('user');

	stream.on('tweet', function(tweet) {
		var message = tweet.text;
		var username = tweet.user.screen_name;
		var userId = tweet.user.id;
		console.log(username + ' - ' + userId + ' - ' + message);
	});
});
