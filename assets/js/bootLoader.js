var Ele = {};
	
var Eleuthera; 
Ele.loadWAMI = function() {

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
		onReady : onWamiReady,
		onRecognition : onWamiRecognition,
		onRecognitionResult : onWamiRecognitionResult,
		onError : onWamiError,
		onTimeout : onWamiTimeout
        }; 

    //Create your WAMI application with the settings and grammar we just created
  	Eleuthera = new Wami.App(options);
};


function onWamiReady(){
	postToLive("WAMI Loaded", "success");
	displayDoc();
}

function onWamiRecognitionResult(result) {
			    Wami.utils.debug(result);
}

function onWamiRecognition(result) {
			    Wami.utils.debug(result);
				var resultString = (result.text());
				if(result.settled()) {
					Ele.processResults(resultString);
				}else{
					Ele.postToLive(resultString, "caution");
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
		{"name" : "header" , "codeStart" : "<header>\n" , "codeEnd" : "</header>\n"},
		{"name" : "footer" , "codeStart" : "<footer>\n" , "codeEnd" : "</footer>\n"},
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
		{"type" : "html" , "lang" : "en" , "locale" : "en-US" , "charset" : "UTF-8" , "children" : [1,2,3,4]}
	],
	"contents" : [
		{"name" : "dock type" , "codeStart" : "<!DOCTYPE HTML>" , "codeEnd" : "\n" , "objID" : 1 , "parent" : 0 , "hasChild" : false , "processed" : false},
		{"name" : "H T M L" , "codeStart" : "<html lang=\"\">\n" , "codeEnd" : "\n</html>" , "objID" : 2 , "parent" : 0 , "hasChild" : true , "children" : [3.4] , "processed" : false},
		{"name" : "head" , "codeStart" : "<head>\n" , "codeEnd" : "\n</head>\n" , "objID" : 3 , "parent" : 2 , "hasChild" : false , "processed" : false},
		{"name" : "body" , "codeStart" : "<body>\n" , "codeEnd" : "\n</body>" , "objID" : 4 , "parent" : 2 , "processed" : false}
	]
};

//displays the HTML code in the textarea #output
Ele.displayDoc = function(){
outputCode = "";
$.each(objDocument.contents, function(i,val){
if(objDocument.contents[i].hasChild === true && objDocument.contents[i].processed !== true){
outputCode += val.codeStart;
$.each(objDocument.contents, function(j,valu){
if(objDocument.contents[j].processed !== true &&
objDocument.contents[j].parent === objDocument.contents[i].objID){
outputCode += (valu.codeStart + valu.codeEnd);
objDocument.contents[j].processed = true;
}
});
outputCode += val.codeEnd;
objDocument.contents[i].processed = true;
}else if(objDocument.contents[i].hasChild === false && objDocument.contents[i].processed !== true){
outputCode += (val.codeStart + val.codeEnd);
objDocument.contents[i].processed = true;
}
});
$('#code').text(outputCode);
$.each(objDocument.contents, function(k,v){
objDocument.contents[k].processed = false;
});
};

/* function getChildren(children){
	var str = "";
	for(x=0;x<children.length;x++){
		if(objDocument.contents[(children[x] - 1)].hasChild !== true && objDocument.contents[(children[x] - 1)].processed !== true){
			str += (objDocument.contents[(children[x] - 1)].codeStart + objDocument.contents[(children[x] - 1)].codeEnd);
			objDocument.contents[(children[x] - 1)].processed = true;
		}else if(objDocument.contents[(children[x] - 1)].hasChild === true && objDocument.contents[(children[x] - 1)].processed !== true){
			str += objDocument.contents[(children[x] - 1)].codeStart;
			str += getChildren(objDocument.contents[(children[x] - 1)].children);
			str += objDocument.contents[(children[x] - 1)].codeEnd;
			objDocument.contents[(children[x] - 1)].processed = true;
		}
	
	}
	
	return str;
} */

//Posts messages and results to ARIA-live
Ele.postToLive = function(message, classString){
	live.append('<p>' + message + '</p>').addClass(classString).slideDown(300).delay(4000).slideUp(300);
	setInterval(function(){live.empty().removeClass();} ,5000);
	};

//Separates words, and finds matches	
Ele.processResults = function(resultString){
	var word = resultString.split(' ');
	var cmd = word[0], ele = word[1], codeStart, codeEnd;
	switch(cmd){
		case "insert":
			$.each(objElements.html, function(i,v){
				if(v.name == ele){
					codeStart = v.codeStart;
					codeEnd = v.codeEnd;
					Ele.outputToDoc(ele,codeStart,codeEnd);
				}
			});
			Ele.displayDoc();
			Ele.postToLive(resultString, "success");
			break;
		
		case "select":
			$.makeArray(objDocument.contents);
			var selected = $.inArray(ele, objDocument.contents);
			Ele.postToLive(selected, "caution");
			break;
		
		default:
			Ele.postToLive(resultString, "success");
	}
};

//Assigns objID, and adds HTML element to doc obj array
Ele.outputToDoc = function(name,codeStart,codeEnd){

	var arrayCount = (objDocument.contents.length);
	var obj = {"name" : name , "codeStart" : codeStart , "codeEnd" : codeEnd , "objID" : ++arrayCount , "parent" : 4 , "hasChild" : false , "processed" : false};
	if(obj.parent !== '0'){
		
	}
	objDocument.contents.push(obj);
/* 	objDocument.contents[3].parent.push(arrayCount);
	objDocument.data[0].children.push(arrayCount); */
};

//Ele.loadWAMI();

$(document).ready(function(){
	live.hide();
	Ele.postToLive("WAMI Loaded", "success");
	Ele.displayDoc();
	
 var delay;
      // Initialize CodeMirror editor with a nice html5 canvas demo.
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

});
