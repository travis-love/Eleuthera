var Ele = {};
	

Ele.loadWAMI = function() {
var Eleuthera; 

//create the grammar
var header = 
	"#JSGF V1.0;\n" +
	"grammar Eleuthera;\n" +
	"public <top> = (<command> <element> [<audit> <command> <element>]*);\n";
	
var commands = 
	"<command> = (insert | append | prepend | select | deselect | remove | erase | delete);\n";
	
var elements = 
	"<element> = (style | link | article | aside | details | caption | figure | footer | header | group | nav | section | function | var);\n";
	
var audit = 
	"<audit> = (with | and)+ | here;";
	
        var grammar = {
			language : "en-us",
			grammar : header + commands + elements + audit,
			aggregate : false,
			incremental : false
		};

  	//Handlers are functions which are called for various events:
  	var options = {
		devKey : "a6db053ed80bc7624909e622ce5d3a24",
		guiID : "properties",
		grammar : grammar,
		onReady : Ele.onWamiReady,
		onRecognition : Ele.onWamiRecognition,
		onRecognitionResult : Ele.onWamiRecognitionResult,
		onError : Ele.onWamiError,
		onTimeout : Ele.onWamiTimeout
        }; 

    //Create your WAMI application with the settings and grammar we just created
  	Eleuthera = new Wami.App(options);
};

Ele.onWamiReady = function(){
	Ele.postToLive("WAMI Loaded", "success");
};

Ele.onWamiRecognitionResult = function(result) {
			    Wami.utils.debug(result);
};

Ele.onWamiRecognition = function(result) {
			    Wami.utils.debug(result);
				var resultString = (result.text());
				if(result.settled()) {
					Ele.processResults(resultString);
				}else{
					Ele.postToLive(resultString, "caution");
				}
};

Ele.onWamiError = function(type, message){
	postToLive("There was a problem loading...", "error");
		console.log("WAMI error: type  = " + type + ", message = " + message);
};

Ele.onWamiTimeout = function() {
	postToLive("WAMI has timed out, sadly you must refresh...", "caution");
	};


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
		{"name" : "button" , "code" : "<button></button>"},
		{"name" : "option group" , "code" : "<optgroup>"},
		{"name" : "legend" , "code" : "<legend>"},
		{"name" : "section" , "code" : "<section/>"},
		{"name" : "article" , "code" : "<article/>"},
		{"name" : "header" , "code" : "<header/>"},
		{"name" : "footer" , "code" : "<footer/>"},
		{"name" : "address" , "code" : "<address>"},
		{"name" : "dialog" , "code" : "<dialog>"},
		{"name" : "strong" , "code" : "<strong></strong>"},
		{"name" : "progress" , "code" : "<progress>"},
		{"name" : "field set" , "code" : "<fieldset>"},
		{"name" : "data grid" , "code" : "<datagrid>"},
		{"name" : "data list" , "code" : "<datalist>"},
		{"name" : "keygen" , "code" : "<keygen>"},
		{"name" : "output" , "code" : "<output>"},
		{"name" : "details" , "code" : "<details>"},
		{"name" : "div" , "code" : "<div/>"}
	]
};

//index html for easy search
var easyCodeIndex = {};
$(function(){
	$.each(objElements.html, function(i,v){
		easyCodeIndex[v.name] = v.code;
	});
}());

//Posts messages and results to ARIA-live
Ele.postToLive = function(message, classString){
	var live = $('#live');
	live.append('<p>' + message + '</p>').addClass(classString).slideDown(300).delay(4000).slideUp(300);
	setInterval(function(){live.empty().removeClass();} ,5000);
	};

//Separates words, and finds matches	
Ele.processResults = function(resultString){
	var word = resultString.split(' ');
	var cmd = word[0], ele = word[1];
	
	switch(cmd){
		case "insert":
			$('#preview').contents().find('body').append(easyCodeIndex[ele]);
			Ele.postToLive(resultString, "success");
			break;
		
		case "select":
			$('#preview').contents().find(ele).addClass('selected');
			Ele.postToLive(resultString, "success");
			break;
		
		default:
			Ele.postToLive("Did you say: " + resultString + "?", "error");
	}
	
};

 
Ele.loadIframe = function(){
	
	var cssLink = document.createElement('link') 
	cssLink.href = 'assets/css/iframe.css'; 
	cssLink .rel = 'stylesheet'; 
	cssLink .type = 'text/css'; 
	$('#preview').contents().find('head').append(cssLink);
	//possible other dependencies
};

//method to update textarea (or Codemirror) value
Ele.iframeToText = function(){
// Get current body text
var html = $('#preview').contents().find('html').html();
$('#code').val(html);	
};

$(document).ready(function(){
	
	//global vars
	var live = $('#live');
	$('#submit').on('click', function(){
		Ele.processResults($('#input').val());
	});
	
	//execute when initializing
	live.hide();
	
	// Initialize CodeMirror editor
	var delay;
	var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
		mode: 'text/html',
		tabMode: 'indent',
		onChange: function() {
		clearTimeout(delay);
		delay = setTimeout(updatePreview, 300);
		}
	});

	function updatePreview() {
		var previewer = document.getElementById('preview');
		var preview =  previewer.contentDocument ||  previewer.contentWindow.document;
		preview.open();
		preview.write(editor.getValue());
		preview.close();
	}
	setTimeout(updatePreview, 300);

	
	Ele.loadIframe();
	Ele.iframeToText();
	Ele.postToLive("Document Loaded", "success");
});
