$(document).ready(function(){
	
	//Normalize browser getUserMedia call
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	
	//Normalize URL for video/audio stream
	window.URL || (window.URL = window.webkitURL || window.msURL || window.oURL);
	
	//Browser HTML5 feature detection
	function hasGetUserMedia(){
		return !!(navigator.getUserMedia);
	};
	
	//Load camera/mic streams
	function loadUserMedia(useVideo,useAudio,outputID){
		
		//if HTML5 supported
		if(hasGetUserMedia()){
			
			//Send stream to selected video/audio element #id
			var output = document.getElementById(outputID);
			navigator.getUserMedia({video: useVideo, audio: useAudio}, successCallback, errorCallback);
				function successCallback(stream) {
					output.src = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(stream) : stream;
					console.log("Stream is a go!");
				}
				function errorCallback(error) {
					console.error('An error occurred: [CODE ' + error.code + ']');
					return;
				}
		}
		//Flash fall-back
		else{
			Wami.setup({id : outputID});
		}
	};
	
	
loadUserMedia(false,false,"wami");
});