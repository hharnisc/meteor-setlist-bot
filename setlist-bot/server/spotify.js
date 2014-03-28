

// SpotifyTrackIds.insert({
// 	artist: "Foo Fighters",
// 	title: "Everlong - acoustic",
// 	trackId: "07q6QTQXyPRCf7GbLakRPr"
// });

// var myTracks = SpotifyTrackIds.find({}).fetch();
// SpotifyPlaysets.insert({
// 	name: "Acoustic hits",
// 	tracks: [
// 		myTracks[0].trackId
// 	]
// });


var SpotifyRequest = function() {
}

SpotifyRequest.prototype.getTrackIds = function(artist, tracks) {
	console.log(artist);
	console.log(tracks);

	var trackIds = {};

	tracks.forEach(function(trackName) {
		var baseUrl = 'https://ws.spotify.com/search/1/track.json';
		var params = {
			'q': artist + ' ' + trackName
		};

		// FIXME:
		// Turned off/worked aroudn async web gets in the interest of getting something working for the code jam.
		// Maybe a hack solution could be to bail/halt if the number of trackIds is less than the number of tracks.

		// FIXME:
		// The below code does NO error handling

		// Fixme:
		// The below code crashes if there are no results for the query in question.

		// HTTP.call('GET', baseUrl, {'params': params}, function(error, result) {
		// 	console.log(this.trackIds);
		// 	if (error != null) {
		// 		console.error('An error occurred trying to find ' + artist + ': ' + trackName);

		// 		trackIds[trackName] = null;
		// 	}
		// 	else {
		// 		var responseData = JSON.parse(result.content);
		// 		var fullTrackId = responseData.tracks[0].href;
		// 		var splitTrackId = fullTrackId.split(':');
		// 		var shortTrackId = splitTrackId[splitTrackId.length - 1];

		// 		console.log(trackName + ': ' + shortTrackId);
		// 		trackIds[trackName] = shortTrackId;
		// 	}
		// });
		var result = HTTP.call('GET', baseUrl, {'params': params});
		var responseData = JSON.parse(result.content);
		var fullTrackId = responseData.tracks[0].href;
		var splitTrackId = fullTrackId.split(':');
		var shortTrackId = splitTrackId[splitTrackId.length - 1];

		console.log(trackName + ': ' + shortTrackId);
		trackIds[trackName] = shortTrackId;
	});

	// while (trackIds.length < tracks.length) {
	// }

	results = [];
	tracks.forEach(function(trackName) {
		results.push(trackIds[trackName]);
	});

	return results;
}

SpotifyRequest.prototype.getCoverImage = function(trackId) {
	var baseUrl = 'https://embed.spotify.com/';
	var params = {
		'uri': 'spotify:trackset:CoverFetch:' + trackId
	};
	var headers = {
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'
	};

	console.log(baseUrl + '?uri=' + params['uri']);

	var result = HTTP.call('GET', baseUrl, {'params': params, 'headers': headers});
	var html = result.content;

	// Find the cover image using regexes.
	var coverImageRegex = /data-ca="([^"]+)"/;
	var coverImage = coverImageRegex.exec(html)[1];

	return coverImage;
}

// r = new SpotifyRequest();
// trackIds = r.getTrackIds('Foo Fighters', ['Everlong', "monkey wrench", "best of you"]);
// trackIds = ['07q6QTQXyPRCf7GbLakRPr'];
// trackIds.forEach(function(trackId) {
// 	var coverImage = r.getCoverImage(trackId);
// 	console.log('coverImage: ' + coverImage);
// });
// console.log(trackIds);

