$(document).ready(function() {

	$("#output").html('Hello world.');
	
	// vars
	var watchID;
	var options = {};
	var positions = [];
	var maxPositions = 10;
	
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
		
		if(positions.length < maxPositions) 
		{
			positions.push(position);
		}
		else navigator.geolocation.clearWatch(watchID);
	}
	
	function onLocationError(error){
		
		console.log('onLocationError: ' + error.code + ": " + error.message);
	}
});