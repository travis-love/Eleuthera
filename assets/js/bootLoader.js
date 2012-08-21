var Ele = Ele || {};

$(document).ready(function(){
	Ele.globals.live.hide();
	Ele.WAMI.loadWAMI("a6db053ed80bc7624909e622ce5d3a24","properties");
	//Ele.textEdit.loadCodeMirror();
	$('#submit').on('click', function(){
			Ele.action.processResults($('#input').val());
		});
});
