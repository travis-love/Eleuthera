var Ele = Ele || {};

$(document).ready(function(){
	Ele.globals.live.hide();
	Ele.WAMI.loadWAMI();
	//Ele.textEdit.loadCodeMirror();
	$('#submit').on('click', function(){
			Ele.action.processResults($('#input').val());
		});
});
