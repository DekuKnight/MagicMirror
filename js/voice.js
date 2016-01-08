var voice = {
	'say *term': function(term){
		$('.conversation').flashMessage(term, 1000, 2000);
		voice.speak(term);
	},
	'who are you': function(){
		var term = 'I am Kaylee';
		$('.conversation').flashMessage(term, 1000, 2000);
		voice.speak(term);
	},
	'hide (the) weather': function(){
		$('.windsun').fadeOut(500);
		$('.temp').fadeOut(500);
		$('.forecast').fadeOut(500);
		voice.speak('Hiding the weather');
	},
	'show (the) weather': function(){
		$('.windsun').fadeIn(500);
		$('.temp').fadeIn(500);
		$('.forecast').fadeIn(500);
		voice.speak('Showing the weather');
	},
	'hide (my to do) list': function(){
		$('.calendar').fadeOut(500);
		voice.speak('Hiding your to do list');
	},
	'show (my to do) list': function(){
		$('.calendar').fadeIn(500);
		voice.speak('Showing your to do list');
	},
	'hide (the) time': function(){
		$('.time').fadeOut(500);
		$('.date').fadeOut(500);
		voice.speak('Hiding the time');
	},
	'show (the) time': function(){
		$('.time').fadeIn(500);
		$('.date').fadeIn(500);
		voice.speak('Showing the time');
	},
	'good night (kaylee)': function(){
		$('.conversation').flashMessage('Goodnight sir', 1000, 2000);
		voice.speak('Good night sir');
		$('.time').fadeOut(500);
		$('.date').fadeOut(500);
		$('.calendar').fadeOut(500);
		$('.windsun').fadeOut(500);
		$('.temp').fadeOut(500);
		$('.forecast').fadeOut(500);
	},
	'good morning (kaylee)': function(){
		$('.conversation').flashMessage('Good morning sir', 1000, 2000);
		voice.speak('Good morning sir');
		$('.time').fadeIn(500);
		$('.date').fadeIn(500);
		$('.calendar').fadeIn(500);
		$('.windsun').fadeIn(500);
		$('.temp').fadeIn(500);
		$('.forecast').fadeIn(500);
		},
};
	
voice.speak = function(term){
	var msg = new SpeechSynthesisUtterance(term);
	var voices = window.speechSynthesis.getVoices();
	msg.voice = voices[2];
	msg.pitch = 0;
	window.speechSynthesis.speak(msg);
}
	
voice.init = function(){
	if(annyang){
		annyang.addCommands(voice);
		annyang.debug();
		annyang.start();
	}
}