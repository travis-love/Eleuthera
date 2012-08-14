var Ele = Ele || {};

(function($, Ele, CodeMirror, Wami){

	//globals
	function globals(){
		var that = {};
			that.live = $('#live');
			that.code = $('#code');
			that.preview = $('#preview');
		return that;
	}
	

	//code library and return methods
	function dictionary() {
		var that = {};
		
		//contains phonetics and code pairs
		objElements = {
			"html" : [
				{"name" : "html5" , "code" : "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n</head>\n<body class=\"selected\">\n\t\n</body>\n</html>"},
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
			],
		"selectors" : [
			{"name" : "ID" , "code" : "#"},
			{"name" : "class" , "code" : "."}
			]
		};
		
		//index method to use for easy search
		that.indexCode = function(source){
			var that = {};
				$.each(source, function(i,v){
					that[v.name] = v.code;
				});
			return that;
		};
		
		//html code indexed
		that.html = that.indexCode(objElements.html);
		that.selectors = that.indexCode(objElements.selectors);
		return that;
	};
	
	
	function action() {
		var that = {};
		that.selected = Ele.globals.preview.contents().find('body');
		
		
		that.select = function(select){
			if(!Ele.globals.preview.contents().find(select).hasClass('selected')){
				that.selected.toggleClass('selected');
				that.selected = Ele.globals.preview.contents().find(select);
				that.selected.toggleClass('selected');
			}
		};
		
		//resets selected element
		that.reset = function(){
			that.select('body');
		};
		
		//Posts messages and results to ARIA-live
		that.postToLive = function(message, classString){
			Ele.globals.live.append('<p>' + message + '</p>').addClass(classString).slideDown(300).delay(4000).slideUp(300);
				setInterval(function(){Ele.globals.live.empty().removeClass();} ,5000);
		};
		
		//Separates words, and finds matches	
		that.processResults = function(resultString){
			var word = resultString.split(' ');
			var cmd = word[0], ele = word[1], name = word[2];
			
			switch(cmd){
				case "insert":
					that.selected.append(Ele.dictionary.html[ele]);
					that.postToLive(resultString, "success");
					break;

				case "add":
					
					switch(ele){
						case "class" :
							that.selected.addClass(name);
							that.postToLive(resultString, "success");
							break;
						
						case "ID" :
							that.selected.attr("id", name);
							that.postToLive(resultString, "success");
							break;
					}
					break;
					
				case "select":
					that.select(ele);
					that.postToLive(resultString, "success");
					break;
				
				case "reset":
					that.reset();
					break;
					
				default:
					that.postToLive("Did you say: " + resultString + "?", "error");
			}
		Ele.textEdit.toText();
		};
	return that;
	}
	
	
	function wami() {
		
		var Eleuthera, that = {}; 
		
		that.loadWAMI = function(){
			//create the grammar
			var header = 
				"#JSGF V1.0;\n" +
				"grammar Eleuthera;\n" +
				"public <top> = (<command> <element> [<name>]*);\n";
				
			var commands = 
				"<command> = (insert | append | prepend | select | add | deselect | remove | erase | delete);\n";
				
			var elements = 
				"<element> = (style | link | article | aside | details | caption | figure | footer | header | group | nav | section | div | ID | class);\n";
				
			var audit = 
				"<audit> = (with | and)+ | here;";
				
			var name = 
				"<name> = container | menu | navigation | wrapper | content | inner | title | success | error;";
				
			var grammar = {
				language : "en-us",
				grammar : header + commands + elements + audit + name,
				aggregate : false,
				incremental : false
			};

			//Handlers are functions which are called for various events:
			var options = {
				devKey : "a6db053ed80bc7624909e622ce5d3a24",
				guiID : "properties",
				grammar : grammar,
				onReady : that.onWamiReady,
				onRecognition : that.onWamiRecognition,
				onRecognitionResult : that.onWamiRecognitionResult,
				onError : that.onWamiError,
				onTimeout : that.onWamiTimeout
				}; 

			//Create your WAMI application with the settings and grammar we just created
			Eleuthera = new Wami.App(options);
				
			return Eleuthera;
		};
		
		that.onWamiReady = function(){
			Ele.action.postToLive("WAMI Loaded", "success");
			Ele.textEdit.loadCodeMirror();
		};

		that.onWamiRecognitionResult = function(result) {
				Wami.utils.debug(result);
			};

		that.onWamiRecognition = function(result) {
				Wami.utils.debug(result);
				var resultString = (result.text());
				if(result.settled()) {
					Ele.action.processResults(resultString);
				}else{
					Ele.action.postToLive(resultString, "caution");
				}
			};

		that.onWamiError = function(type, message){
				postToLive("There was a problem loading...", "error");
					console.log("WAMI error: type  = " + type + ", message = " + message);
			};

		that.onWamiTimeout = function() {
				postToLive("WAMI has timed out, sadly you must refresh...", "caution");
			};
			
	return that;
	}
	
	
	//methods to load/update iframe and textarea
	function textEdit(){
		
		var that = {};
		that.iframe = Ele.globals.preview;
		var editorValue;

		//method to load iframe/codemirror
		that.loadCodeMirror = function(lang) {
			if(!lang){
				lang = "html"
			}
			
			// Initialize CodeMirror editor
			var delay;
			that.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
				mode: 'text/'+ lang,
				tabMode: 'indent',
				onChange: function() {
				clearTimeout(delay);
				delay = setTimeout(that.update, 300);
				}
			});
			
			switch(lang){
				case "html":
					editorValue = Ele.dictionary.html["html5"];
					that.editor.setValue(editorValue);
					that.update();
					break;
				case "css":
					break;
				case "javascript":
					break;
					
			}
		
		that.iframe.load(function () {
				//var iframeDoc = that.iframe.contents();
				that.iframeWindow = that.iframe.contentWindow;
				that.iframeDocument = iframeWindow.document;		
				that.jQuery = iframeWindow.jQuery;
				that.renderUIOContainer = that.jQuery("body", that.iframeDocument);
				that.jQuery(that.iframeDocument).ready(that.update);
			});
		};
	
		//method to update iframe
		that.update = function() {
			editorValue = that.editor.getValue();
			that.iframe.contents().html(editorValue);
		};
		
		//method to update textarea (or Codemirror) value
		that.toText = function(){
			// Get current body text
			editorValue = that.iframe.contents().find('html').html();
			Ele.textEdit.editor.setValue(editorValue.replace(/>/ig, '>\n'));	
		};

	return that;
	}
	
	Ele.globals = globals();
	Ele.dictionary = dictionary();
	Ele.action = action();
	Ele.WAMI = wami();
	Ele.textEdit = textEdit();
	
})(jQuery, Ele, CodeMirror, Wami);

