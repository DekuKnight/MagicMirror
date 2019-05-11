jQuery.fn.updateWithText = function(text, speed)
{
	var dummy = $('<div/>').html(text);

	if ($(this).html() != dummy.html())
	{
		$(this).fadeOut(speed/2, function() {
			$(this).html(text);
			$(this).fadeIn(speed/2, function() {
				//done
			});
		});
	}
}

jQuery.fn.flashMessage = function(text, speed, duration)
{
	$(this).fadeOut(speed/2, function() {
		$(this).html(text);
		$(this).fadeIn(speed/2, function() {
			$(this).delay(duration).fadeOut(speed/2, function(){
				//done
			});
		});
	});
}

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

jQuery(document).ready(function($) {
	
	var eventList = [];
	var news = [];
	var newsIndex = 0;
	
	moment.lang(config.lang);
	
	weather.init();
	
	time.init();
	
	voice.init();
	
	//TODO: Get raspi services working
	//reminders.init();
	
	//TODO: Fetch calendar data from google
	calendar.init();
	
	//TODO: Implement new email checker
	//email.init();
});

