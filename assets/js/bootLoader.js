$(document).ready(function(){
	
var Eleuthera; 
function loadWAMI() {

//create the grammar
var header = 
	"#JSGF V1.0;\n" +
	"grammar Eleuthera;\n" +
	"public <top> = (<command> <element> [<location>]);\n";
	
var commands = 
	"<command> = (insert | append | prepend | select | deselect | remove | erase | delete) ;\n";
	
var elements = 
	"<element> = (style | link | article | aside | details | caption | figure | footer | header | group | nav | section | function | var);\n";
	
var locations = 
	"<location> = (with | and)| here;";
	
        var grammar = {
			language : "en-us",
			grammar : header + commands + elements + locations,
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


function onWamiReady(){
	postToLive("WAMI Loaded", "success");
	displayArray();
}

function onWamiRecognitionResult(result) {
			    Wami.utils.debug(result);
}

function onWamiRecognition(result) {
			    Wami.utils.debug(result);
				var resultString = (result.text());
				if(result.settled()) {
					processResults(resultString);
				}else{
					postToLive(resultString, "caution");
				}
}

function onWamiError(type, message){
	postToLive("There was a problem loading...", "error");
		console.log("WAMI error: type  = " + type + ", message = " + message);
}

function onWamiTimeout() {
	postToLive("WAMI has timed out, sadly you must refresh...", "caution");
	}

//DOM global vars
var live = $('#live');
live.hide();
var outputString, outputCode;

//contains phonetics and HTML code pairs
var objElements = {
	"html" : [
		{"name" : "dock type" , "code" : "<!DOCTYPE HTML>\n"},
		{"name" : "H T M L" , "code" : "<html lang=\"\">\n\t|\n</html>"},
		{"name" : "head" , "code" : "<head>\n\t|\n</head>"},
		{"name" : "body" , "code" : "<body>\n\t|\n</body>"},
		{"name" : "anchor" , "code" : "<a href=\"\|\">"},
		{"name" : "mail to" , "code" : "<a href=\"mailto:|\">"},
		{"name" : "abbreviation" , "code" : "<abbr title=\"|\">"},
		{"name" : "acronym" , "code" : "<acronym title=\"|\">"},
		{"name" : "base" , "code" : "<base href=\"|\" />"},
		{"name" : "bee D oh" , "code" : "<bdo dir=\"\">"},
		{"name" : "are tea el" , "code" : "<bdo dir=\"rtl\">"},
		{"name" : "el tea are" , "code" : "<bdo dir=\"ltr\">"},
		{"name" : "stylesheet" , "code" : "<link rel=\"stylesheet\" type=\"text/css\" href=\"${1:style}.css\" media=\"all\" />"},
		{"name" : "printsheet" , "code" : "<link rel=\"stylesheet\" type=\"text/css\" href=\"|print.css\" media=\"print\" />"},
		{"name" : "fave icon" , "code" : "<link rel=\"shortcut icon\" type=\"image/x-icon\" href=\"|favicon.ico\" />"},
		{"name" : "apple icon" , "code" : "<link rel=\"apple-touch-icon\" href=\"|favicon.png\" />"},
		{"name" : "are es es" , "code" : "<link rel=\"alternate\" type=\"application/rss+xml\" title=\"RSS\" href=\"|rss.xml\" />"},
		{"name" : "atom" , "code" : "<link rel=\"alternate\" type=\"application/atom+xml\" title=\"Atom\" href=\"atom.xml\" />"},
		{"name" : "meta you tea eff" , "code" : "<meta http-equiv=\"Content-Type\" content=\"text/html;charset=UTF-8\" />"},
		{"name" : "meta windows" , "code" : "<meta http-equiv=\"Content-Type\" content=\"text/html;charset=windows-1251\" />"},
		{"name" : "meta eye ee" , "code" : "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=7\" />"},
		{"name" : "style" , "code" : "<style type=\"text/css\">"},
		{"name" : "script" , "code" : "<script type=\"text/javascript\">"},
		{"name" : "script source" , "code" : "<script type=\"text/javascript\" src=\"\">"},
		{"name" : "image" , "code" : "<img src=\"\" alt=\"\" />"},
		{"name" : "eye frame" , "code" : "<iframe src=\"\" frameborder=\"0\">"},
		{"name" : "embed" , "code" : "<embed src=\"\" type=\"\" />"},
		{"name" : "object" , "code" : "<object data=\"\" type=\"\">"},
		{"name" : "parameter" , "code" : "<param name=\"\" value=\"\" />"},
		{"name" : "form" , "code" : "<form action=\"\">"},
		{"name" : "get form" , "code" : "<form action=\"\" method=\"get\">"},
		{"name" : "post form" , "code" : "<form action=\"\" method=\"post\">"},
		{"name" : "label for" , "code" : "<label for=\"\">"},
		{"name" : "input" , "code" : "<input type=\"\" />"},
		{"name" : "hidden input" , "code" : "<input type=\"hidden\" name=\"\" />"},
		{"name" : "text input" , "code" : "<input type=\"text\" name=\"\" id=\"\" />"},
		{"name" : "search input" , "code" : "<input type=\"search\" name=\"\" id=\"\" />"},
		{"name" : "email input" , "code" : "<input type=\"email\" name=\"\" id=\"\" />"},
		{"name" : "you are el input" , "code" : "<input type=\"url\" name=\"\" id=\"\" />"},
		{"name" : "password input" , "code" : "<input type=\"password\" name=\"\" id=\"\" />"},
		{"name" : "date time input" , "code" : "<input type=\"datetime\" name=\"\" id=\"\" />"},
		{"name" : "date input" , "code" : "<input type=\"date\" name=\"\" id=\"\" />"},
		{"name" : "locale input" , "code" : "<input type=\"datetime-local\" name=\"\" id=\"\" />"},
		{"name" : "month input" , "code" : "<input type=\"month\" name=\"\" id=\"\" />"},
		{"name" : "week input" , "code" : "<input type=\"week\" name=\"\" id=\"\" />"},
		{"name" : "time input" , "code" : "<input type=\"time\" name=\"\" id=\"\" />"},
		{"name" : "number input" , "code" : "<input type=\"number\" name=\"\" id=\"\" />"},
		{"name" : "color input" , "code" : "<input type=\"color\" name=\"\" id=\"\" />"},
		{"name" : "checkbox input" , "code" : "<input type=\"checkbox\" name=\"\" id=\"\" />"},
		{"name" : "radio input" , "code" : "<input type=\"radio\" name=\"\" id=\"\" />"},
		{"name" : "range input" , "code" : "<input type=\"range\" name=\"\" id=\"\" />"},
		{"name" : "file input" , "code" : "<input type=\"file\" name=\"\" id=\"\" />"},
		{"name" : "submit input" , "code" : "<input type=\"submit\" value=\"\" />"},
		{"name" : "image input" , "code" : "<input type=\"image\" src=\"\" alt=\"\" />"},
		{"name" : "reset input" , "code" : "<input type=\"reset\" value=\"\" />"},
		{"name" : "button input" , "code" : "<input type=\"button\" value=\"\" />"},
		{"name" : "selection" , "code" : "<select name=\"\" id=\"\"></select>"},
		{"name" : "option" , "code" : "<option value=\"\"></option>"},
		{"name" : "text area" , "code" : "<textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\">"},
		{"name" : "context menu" , "code" : "<menu type=\"context\">"},
		{"name" : "toolbar menu" , "code" : "<menu type=\"toolbar\">"},
		{"name" : "video" , "code" : "<video src=\"\">"},
		{"name" : "audio" , "code" : "<audio src=\"\">"},
		{"name" : "ex em el in es" , "code" : "<html xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\">"},
		{"name" : "blockquote" , "code" : "<blockquote>"},
		{"name" : "figure" , "code" : "<figure>"},
		{"name" : "source" , "code" : "<source>"},
		{"name" : "caption" , "code" : "<caption>"},
		{"name" : "column group" , "code" : "<colgroup>"},
		{"name" : "button" , "code" : "<button>|</button>"},
		{"name" : "option group" , "code" : "<optgroup>"},
		{"name" : "legend" , "code" : "<legend>"},
		{"name" : "section" , "code" : "<section>\n\t\n\b</section>"},
		{"name" : "article" , "code" : "<article>\n\t\n\b</article>"},
		{"name" : "header" , "code" : "<header>\n\t\n\b</header>"},
		{"name" : "footer" , "code" : "<footer>\n\t\n\b</footer>"},
		{"name" : "address" , "code" : "<address>"},
		{"name" : "dialog" , "code" : "<dialog>"},
		{"name" : "strong" , "code" : "<strong>|</strong>"},
		{"name" : "progress" , "code" : "<progress>"},
		{"name" : "field set" , "code" : "<fieldset>"},
		{"name" : "data grid" , "code" : "<datagrid>"},
		{"name" : "data list" , "code" : "<datalist>"},
		{"name" : "keygen" , "code" : "<keygen>"},
		{"name" : "output" , "code" : "<output>"},
		{"name" : "details" , "code" : "<details>"}
	]
};

//contains the documents data and HTML contents
var objDocument = {
	"data" : [
		{"type" : "html"},
		{"lang" : "en"},
		{"locale" : "en-US"},
		{"charset" : "UTF-8"}
	],
	"contents" : [
		{"name" : "dock type" , "code" : "<!DOCTYPE HTML>\n", "objID" : "1" , "parent" : "0"},
		{"name" : "H T M L" , "code" : "<html lang=\"\">\n\t|\n</html>" , "objID" : "2" , "parent" : "0"},
		{"name" : "head" , "code" : "<head>\n\t|\n</head>" , "objID" : "3" , "parent" : "2"},
		{"name" : "body" , "code" : "<body>\n\t|\n</body>" , "objID" : "4" , "parent" : "2"}
	]

};

//displays the HTML code in the textarea #output
function displayDoc(){
outputCode = "";
	$.each(objDocument.contents, function(key,val){
		outputCode += val.code;
	});
	$('#output').text(outputCode);
}

//Posts messages and results to ARIA-live
function postToLive(message, classString){
	live.append('<p>' + message + '</p>').addClass(classString).slideDown(300).delay(4000).slideUp(300);
	setInterval(function(){live.empty().removeClass();} ,5000);
	}

//Separates words, and finds matches	
function processResults(resultString){
	for(var i in resultString){
		var word = resultString.split(' ');
	}
	var cmd = word[0], ele = word[1], code;
		$.each(objElements.html, function(i,v){
			if(v.name == ele){
				code = v.code;
				outputToDoc(ele,code);
			}
		});
		displayDoc();
		postToLive(resultString, "success");
}

//Assigns objID, and adds HTML element to doc obj array
function outputToDoc(name,code){

	var arrayCount = (objDocument.contents.length);
	var obj = {"name" : name , "code" : code , "objID" : arrayCount , "parent" : "4"};
	objDocument.contents.push(obj);
} 

loadWAMI();
});