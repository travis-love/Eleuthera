$(document).ready(function(){
	
var Eleuthera; 
function loadWAMI() {
var jsgf = 
	"#JSGF V1.0;\n" +
	"grammar Eleuthera;\n" +
	"public <top> = hello wami | i want a cracker | feed me;\n";

        var grammar = {
            language : "en-us", 
            grammar : jsgf
		};

  	//Handlers are functions which are called for various events:
  	var options = {
		devKey : "a6db053ed80bc7624909e622ce5d3a24",
		guiID : "properties",
		grammar : grammar,
		onReady : onWamiReady,
		onRecognition : onWamiRecognition,
		onRecognitionResult : onWamiRecognitionResult,
		onError : onWamiError,
		onTimeout : onWamiTimeout
        }; 

    //Create your WAMI application with the settings and grammar we just created
  	Eleuthera = new Wami.App(options);
}

var live = $('#live');
live.hide();

function onWamiReady(){
	live.append('<p>WAMI successful</p>').addClass('success').slideDown(300).delay(2000).slideUp(300);
}

function onWamiRecognitionResult(result) {
			    Wami.utils.debug(result);
}

function onWamiRecognition(result) {
			    Wami.utils.debug(result);
				if(result.settled()) {
				live.empty().append('<p>' + (result.text()) + '</p>').addClass('success').slideDown(300).delay(2000).slideUp(300);
				}else{
				live.empty().append('<p>You said? ' + (result.text()) + '</p>').addClass('caution').slideDown(300).delay(2000).slideUp(300);
				}
}

function onWamiError(type, message){
	live.append('<p>There was a problem loading...</p>').addClass('error').slideDown(300).delay(5000).slideUp(300).empty();
		console.log("WAMI error: type  = " + type + ", message = " + message);
}
function onWamiTimeout() {
	live.append('<p>WAMI has timed out, sadly you must refresh...</p>').addClass('caution').slideDown(300).delay(2000).slideUp(300).empty();
}

loadWAMI();
});