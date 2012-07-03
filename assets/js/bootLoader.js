$(document).ready(function(){
	
var Eleuthera; 
function loadWAMI() {

//create the grammar
var header = 
	"#JSGF V1.0;\n" +
	"grammar Eleuthera;\n" +
	"public <top> = (<command>+ <element>);\n";
	
var command = 
	"<command> = insert | append | prepend | select | deselect | remove | erase | delete;\n";
	
var elements = 
	"<element> = style | link | article | aside | details | caption | figure | footer | header | group | nav | section | function | var;";
	
        var grammar = {
			language : "en-us",
			grammar : header + command + elements,
			aggregate : false,
			incremental : false
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
function clean(){
	setInterval(function(){live.empty().removeClass();} ,5000);
	}

function onWamiReady(){
	live.append('<p>WAMI successful</p>').addClass('success').slideDown(300).delay(2000).slideUp(300);
	clean();
}

function onWamiRecognitionResult(result) {
			    Wami.utils.debug(result);
}

function onWamiRecognition(result) {
			    Wami.utils.debug(result);
				if(result.settled()) {
					live.append('<p>' + (result.text()) + '</p>').addClass('success').slideDown(300).delay(2000).slideUp(300);
					clean();
				}else{
				live.empty().append('<p>You said? ' + (result.text()) + '</p>').addClass('caution').slideDown(300).delay(2000).slideUp(300);
				clean();
				}
}

function onWamiError(type, message){
	live.empty().append('<p>There was a problem loading...</p>').addClass('error').slideDown(300).delay(5000).slideUp(300);
	clean();
		console.log("WAMI error: type  = " + type + ", message = " + message);
}
function onWamiTimeout() {
	live.empty().append('<p>WAMI has timed out, sadly you must refresh...</p>').addClass('caution').slideDown(300).delay(2000).slideUp(300);
	clean();
}

loadWAMI();
});