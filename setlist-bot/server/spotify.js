

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

// r = new SpotifyRequest();
// trackIds = r.getTrackIds('Foo Fighters', ['Everlong', "monkey wrench", "best of you"]);
// console.log(trackIds);

