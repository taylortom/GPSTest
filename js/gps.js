$(document).ready(function() {
	
	console.log('document.ready');

	// vars
	var $output = $("#output");
	var watchID;
	var positions = [];
	var options = { 
		enableHighAccuracy: true, 
		maximumAge        : 10000, 
		timeout           : 10000
	};
	
	if ("geolocation" in navigator) _initGPS();
	else console.log('geolocation not supported....');
	
	function _initGPS(){
		
		console.log('_initGPS');
		watchID = navigator.geolocation.watchPosition(onLocationSuccess, onLocationError, options);
	}
	
	/**
	 * Note: these only fire when the location changes...
	 */
	
	function onLocationSuccess(position){
		
		console.log('onLocationSuccess: ' + position.coords + " [" + position.timestamp + "]");
		
		$output.append("<li>long: " + position.coords.longitude + "lat: " + position.coords.latitude + "</li>")
		positions.push(position);
		
		// need to call this to end it all...........
		// navigator.geolocation.clearWatch(watchID);
	}
	
	function onLocationError(error){
		
		console.log('onLocationError: ' + error.code + ": " + error.message);
	}
});