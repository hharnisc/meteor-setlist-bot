setlistGrabber = function(artist){

	try {
		var result = HTTP.get('http://api.setlist.fm/rest/0.1/search/setlists.json?artistName=' + artist);
		var songList = [];
		var setlists = JSON.parse(result.content).setlists.setlist;
		for (var s in setlists) {
			if ('sets' in setlists[s]) {
				var sets = setlists[s].sets;
				if (!!sets) {
					var set = sets.set;
					if (!!set) {
						if (set.length) {
							var songs = set[0].song;
							if (songs.length) {
								for (var so in songs) {
									if ('@name' in songs[so]) {
										songList.push(songs[so]['@name']);
									}
								}
							}
							if (songList.length > 0) {
								return songList;
							}
						}
					}
				}
			}
		}
		return;
	} catch (e) {
		// Got a network error, time-out or HTTP error in the 400 or 500 range.
		return;
	}
};
// Meteor.startup(function (){ 
// 	var artist = 'Cults';
// 	console.log(setlistGrabber(artist));
// });