var calendar = {
	updateInterval : 1000,
	fadeInterval : 1000,
	calendarLocation : '.calendar',
	intervalId: null
}

calendar.update = function()
{
	table = $('<table/>').addClass('xsmall').addClass('calendar-table');
	opacity = 1;

	//Replace with calendar fetching function
	eventList = [];
	eventList.push({'description':'Go to Lunch','days':"1"});
	eventList.push({'description':'Relax','days':"2"});
	eventList.push({'description':'Eat Cake','days':"3"});

	for (var i in eventList) {
		var e = eventList[i];

		var row = $('<tr/>').css('opacity',opacity);
		row.append($('<td/>').html(e.days).addClass('dimmed'));
		row.append($('<td/>').html(e.description).addClass('description'));
		table.append(row);

	}

	$(calendar.calendarLocation).updateWithText(table,calendar.fadeInterval);

};

calendar.init = function(){
	
	this.intervalId = setInterval(function () {
		this.update();
	}.bind(this), this.updateInterval);
	
}