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
	var dummy = $('<div/>').html(text);

	if ($(this).html() != dummy.html())
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
}

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

jQuery(document).ready(function($) {
	
	var eventList = [];
	var reminderList = [];
	var news = [];
	var newsIndex = 0;
	
	(function updateTime()
	{
		var now = moment();
		var date = now.format('LLLL').split(' ',4);
		date = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3];

		$('.date').html(date);
		$('.time').html(now.format('HH') + ':' + now.format('mm') + '<span class="sec">'+now.format('ss')+'</span>');

		setTimeout(function() {
			updateTime();
		}, 1000);
	})();
		
	(function updateCalendar()
	{
		table = $('<table/>').addClass('xsmall').addClass('calendar-table');
		opacity = 1;
	
		//Replace with calendar fetching function
		eventList = [];
		eventList.push({'description':'Go to Lunch','days':"Friday"});
		eventList.push({'description':'Relax','days':"Saturday"});
		eventList.push({'description':'Eat Cake','days':"Saturday"});

		for (var i in eventList) {
			var e = eventList[i];

			var row = $('<tr/>').css('opacity',opacity);
			row.append($('<td/>').html(e.description).addClass('description'));
			row.append($('<td/>').html(e.days).addClass('days dimmed'));
			table.append(row);

			opacity -= 1 / eventList.length;
		}

		$('.calendar').updateWithText(table,1000);

		setTimeout(function() {
        	updateCalendar();
        }, 1000);
	})();

	(function updateReminders() 
	{
		$('.reminder').flashMessage("Buy Milk",1000, 10000);	
		
		setTimeout(function() {
			updateReminders();
		}, 1000);
	})();
});