var Ele = Ele || {};

(function($, Ele, CodeMirror, Wami){

	//bad coding, but these are how I made DOM'S global
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
				{"name" : "html5" , "code" : "<html>\n<head>\n</head>\n<body>\n\t\n</body>\n</html>"},
				{"name" : "dock" , "code" : "<!DOCTYPE HTML>"},
				{"name" : "markup" , "code" : "<html/>"},
				{"name" : "head" , "code" : "<head/>"},
				{"name" : "body" , "code" : "<body/>"},
				{"name" : "anchor" , "code" : "<a href=\"\">"},
				{"name" : "abbreviation" , "code" : "<abbr title=\"\">"},
				{"name" : "acronym" , "code" : "<acronym title=\"\">"},
				{"name" : "base" , "code" : "<base href=\"\" />"},
				{"name" : "right" , "code" : "<bdo dir=\"rtl\">"},
				{"name" : "left" , "code" : "<bdo dir=\"ltr\">"},
				{"name" : "stylesheet" , "code" : "<link rel=\"stylesheet\" type=\"text/css\" href=\"assets/css/iframe.css\" media=\"all\" />"},
				{"name" : "printsheet" , "code" : "<link rel=\"stylesheet\" type=\"text/css\" href=\"print.css\" media=\"print\" />"},
				{"name" : "favicon" , "code" : "<link rel=\"shortcut icon\" type=\"image/x-icon\" href=\"favicon.ico\" />"},
				{"name" : "apple" , "code" : "<link rel=\"apple-touch-icon\" href=\"favicon.png\" />"},
				{"name" : "syndication" , "code" : "<link rel=\"alternate\" type=\"application/rss+xml\" title=\"RSS\" href=\"rss.xml\" />"},
				{"name" : "atom" , "code" : "<link rel=\"alternate\" type=\"application/atom+xml\" title=\"Atom\" href=\"atom.xml\" />"},
				{"name" : "meta" , "code" : "<meta http-equiv=\"Content-Type\" content=\"text/html;charset=UTF-8\" />"},
				{"name" : "script" , "code" : "<script type=\"text/javascript\">"},
				{"name" : "image" , "code" : "<img src=\"\" alt=\"\" />"},
				{"name" : "frame" , "code" : "<iframe src=\"\" frameborder=\"0\">"},
				{"name" : "embed" , "code" : "<embed src=\"\" type=\"\" />"},
				{"name" : "object" , "code" : "<object data=\"\" type=\"\">"},
				{"name" : "parameter" , "code" : "<param name=\"\" value=\"\" />"},
				{"name" : "form" , "code" : "<form action=\"\">"},
				{"name" : "label" , "code" : "<label for=\"\">"},
				{"name" : "hidden" , "code" : "<input type=\"hidden\" name=\"\" />"},
				{"name" : "text" , "code" : "<input type=\"text\" name=\"\" id=\"\" />"},
				{"name" : "search" , "code" : "<input type=\"search\" name=\"\" id=\"\" />"},
				{"name" : "email" , "code" : "<input type=\"email\" name=\"\" id=\"\" />"},
				{"name" : "address" , "code" : "<input type=\"url\" name=\"\" id=\"\" />"},
				{"name" : "password" , "code" : "<input type=\"password\" name=\"\" id=\"\" />"},
				{"name" : "datetime" , "code" : "<input type=\"datetime\" name=\"\" id=\"\" />"},
				{"name" : "date" , "code" : "<input type=\"date\" name=\"\" id=\"\" />"},
				{"name" : "locale" , "code" : "<input type=\"datetime-local\" name=\"\" id=\"\" />"},
				{"name" : "month" , "code" : "<input type=\"month\" name=\"\" id=\"\" />"},
				{"name" : "week" , "code" : "<input type=\"week\" name=\"\" id=\"\" />"},
				{"name" : "time" , "code" : "<input type=\"time\" name=\"\" id=\"\" />"},
				{"name" : "number" , "code" : "<input type=\"number\" name=\"\" id=\"\" />"},
				{"name" : "color" , "code" : "<input type=\"color\" name=\"\" id=\"\" />"},
				{"name" : "checkbox" , "code" : "<input type=\"checkbox\" name=\"\" id=\"\" />"},
				{"name" : "radio" , "code" : "<input type=\"radio\" name=\"\" id=\"\" />"},
				{"name" : "range" , "code" : "<input type=\"range\" name=\"\" id=\"\" />"},
				{"name" : "file" , "code" : "<input type=\"file\" name=\"\" id=\"\" />"},
				{"name" : "submit" , "code" : "<input type=\"submit\" value=\"\" />"},
				{"name" : "image" , "code" : "<input type=\"image\" src=\"\" alt=\"\" />"},
				{"name" : "reset" , "code" : "<input type=\"reset\" value=\"\" />"},
				{"name" : "selection" , "code" : "<select name=\"\" id=\"\"></select>"},
				{"name" : "option" , "code" : "<option value=\"\"></option>"},
				{"name" : "textarea" , "code" : "<textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\">"},
				{"name" : "context" , "code" : "<menu type=\"context\">"},
				{"name" : "toolbar" , "code" : "<menu type=\"toolbar\">"},
				{"name" : "video" , "code" : "<video src=\"\">"},
				{"name" : "audio" , "code" : "<audio src=\"\">"},
				{"name" : "blockquote" , "code" : "<blockquote>"},
				{"name" : "figure" , "code" : "<figure>"},
				{"name" : "source" , "code" : "<source>"},
				{"name" : "caption" , "code" : "<caption>"},
				{"name" : "columns" , "code" : "<colgroup>"},
				{"name" : "button" , "code" : "<button></button>"},
				{"name" : "options" , "code" : "<optgroup>"},
				{"name" : "legend" , "code" : "<legend>"},
				{"name" : "section" , "code" : "<section/>"},
				{"name" : "article" , "code" : "<article/>"},
				{"name" : "header" , "code" : "<header/>"},
				{"name" : "footer" , "code" : "<footer/>"},
				{"name" : "address" , "code" : "<address>"},
				{"name" : "dialog" , "code" : "<dialog>"},
				{"name" : "strong" , "code" : "<strong></strong>"},
				{"name" : "progress" , "code" : "<progress>"},
				{"name" : "fieldset" , "code" : "<fieldset>"},
				{"name" : "grid" , "code" : "<datagrid>"},
				{"name" : "list" , "code" : "<datalist>"},
				{"name" : "keygen" , "code" : "<keygen>"},
				{"name" : "output" , "code" : "<output>"},
				{"name" : "details" , "code" : "<details>"},
				{"name" : "div" , "code" : "<div/>"},
				{"name" : "ordered" , "code" : "<ol/>"},
				{"name" : "unordered" , "code" : "<ul/>"},
				{"name" : "item" , "code" : "<li/>"}
			],
		"selectors" : [
			{"name" : "identity" , "code" : "#"},
			{"name" : "class" , "code" : "."}
			]
		};
		
		//turns the JSON arrays to easy [name]:code pairs
		that.indexCode = function(source){
			var that = {};
				$.each(source, function(i,v){
					that[v.name] = v.code;
				});
			return that;
		};
		
		//html code indexed
		that.html = that.indexCode(objElements.html);
		//indexed jquery selectors
		that.selectors = that.indexCode(objElements.selectors);
		
		//end of dictionary()
		return that;
	};
	
	//this is where all the app actions like "reset" or "processResults" go
	function action() {
		var that = {};
		
		//current DOM selection, default iframe body
		that.selected = Ele.globals.preview.contents().find('body');
		
		//selects DOM element or class\ID element - name
		that.select = function(ele, name){
			var select;
			if(!name){
				name = ""
				select = ele+name; //i.e returns "footer"
			}else{
				select = (Ele.dictionary.selectors[ele]+name); //i.e. "class container" returns ".container"
			}
			
			that.selected.removeClass('selected');//remove only class 'selected'
			that.selected = Ele.globals.preview.contents().find(select);
			that.selected.addClass('selected');
		};
		
		//resets selected DOM to iframe body
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
			var cmd = word[0] /*command*/, 
				ele = word[1] /*DOM or Selector*/,
				name = word[2] /*selector name*/;
			
			switch(cmd){
				case "insert":
					//example, "insert div"
					that.selected.append(Ele.dictionary.html[ele]);
					that.postToLive(resultString, "success");
					break;

				case "add":
					
					switch(ele){
						//example, "add class container"
						case "class" :
							that.selected.addClass(name);
							that.postToLive(resultString, "success");
							break;
						
						//example, "add ID menu"
						case "identity" :
							that.selected.attr("id", name);
							that.postToLive(resultString, "success");
							break;
					}
					break;
					
				case "remove" :
					//remove selected and reset selection
					that.selected.remove(that.selected);
					that.reset();
					that.postToLive(resultString, "success");
				break;
				
				case "select":
					//example, "select div" or "select class container"
					that.select(ele, name);
					that.postToLive(resultString, "success");
					break;
				
				case "reset":
					that.reset();
					break;
					
				
			}
		//iframe contents to Codemirror textarea
		Ele.textEdit.toText();
		};
	return that;
	}
	
	//API methods for voice recognition service
	function wami() {
		
		var Eleuthera, that = {}; 
		
		that.loadWAMI = function(key, outputTo){
			//create the grammar
			var header = 
				"#JSGF V1.0;\n" +
				"grammar Eleuthera;\n" +
				"public <top> = (<command> <element> [<name>]*);\n";//speech structure
				
			var commands = 
				"<command> = (insert | append | prepend | select | add | deselect | remove | erase | delete);\n";
				
			var elements = 
				"<element> = /2/ dock | /2/ markup | /4/ head | /6/ body | /6/ anchor | /2/ abbreviation | /2/ acronym | /2/ base | /2/ right | /2/ left | /2/ stylesheet | /2/ printsheet | /2/ favicon | /2/ apple | /2/ syndication | /2/ atom | /2/ meta | /4/ script | /6/ image | /2/ frame | /4/ embed | /4/ object | /4/ parameter | /6/ form | /6/ label | /6/ hidden | /6/ text | /6/ search | /6/ email | /4/ address | /6/ password | /4/ datetime | /4/ locale | /4/ month | /4/ week | /4/ time | /4/ number | /4/ color | /6/ checkbox | /6/ radio | /4/ range | /4/ file | /6/ submit | /4/ image | /6/ reset | /4/ selection | /4/ option | /6/ textarea | /4/ context | /4/ toolbar | /6/ video | /6/ audio | /4/ blockquote | /4/ figure | /4/ source | /4/ caption | /4/ columns | /6/ button | /4/ options | /2/ legend | /8/ section | /8/ article | /8/ header | /8/ footer | /4/ address | /4/ dialog | /4/ strong | /4/ progress | /4/ set | /2/ grid | /4/ keygen | /4/ output | /4/ details | /8/ div | /6/ ordered | /6/ unordered | /6/ item | /8/ identity | /8/ class;\n";
				
			var name = 
				"<name> = container | menu | navigation | wrapper | content | inner | title | success | error;";
				
			var grammar = {
				language : "en-us",
				grammar : header + commands + elements + name,
				aggregate : false,
				incremental : false
			};

			//Handlers are functions which are called for various events:
			var options = {
				devKey : key,
				guiID : outputTo,
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
			$('#properties > object').css({'position' : 'absolute' , 'left' : '-999px'});
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
			
			//change default template based on language
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

	//end of textEdit
	return that;
	}
	
	//bring them to life
	Ele.globals = globals();
	Ele.dictionary = dictionary();
	Ele.action = action();
	Ele.WAMI = wami();
	Ele.textEdit = textEdit();
	
})(jQuery, Ele, CodeMirror, Wami);

