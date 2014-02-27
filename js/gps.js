$(document).ready(function() {
	
	console.log('document.ready');

	// vars
	var track_count = "track_count";
	var $output = $("#output");
	var positions = [];
	var watchID;
	var options = { 
		enableHighAccuracy: true, 
		timeout           : 10000
	};
	
	if ("geolocation" in navigator) {
		_initButtons();
	}
	else console.log('geolocation not supported....');
	
	function _initButtons(){

		$('.start').click(_startTracking);
		$('.stop').click(_stopTracking);
		$('.map').click(_drawMap);
	}

	function _startTracking(){
		
		console.log('_startTracking');

		_reset();

		watchID = navigator.geolocation.watchPosition(function(position) {

			var time = new Date(position.timestamp);

			$output.append("<li>long: " + position.coords.longitude + "lat: " + position.coords.latitude + " at " + time.toTimeString() + "</li>")
			positions.push(position);
			
		}, 
			function(){ console.log('onLocationError: ' + error.code + ": " + error.message);
	    }, options);
	}

	function _stopTracking(){

		console.log('_stopTracking');

		navigator.geolocation.clearWatch(watchID);
		watchID = null;

		var trackCount = parseInt(window.localStorage.getItem(track_count));
		var trackID = (!Number.isNaN(trackCount)) ? trackCount+1 : 1;

		window.localStorage.setItem(trackID, JSON.stringify(positions));
		window.localStorage.setItem(track_count, trackID);

		_reset();
	}

	function _drawMap(){

		console.log('_drawMap');

		var lastID = parseInt(window.localStorage.getItem(track_count));
		console.log(lastID + ": " + window.localStorage.getItem(lastID));
	}

	function _reset(){

		positions = [];
		$output.html('');
	}
});