var reminders = {
		
		reminderList : [],
		reminderIndex : 0,
		reminderLocation: '.reminder',
		fadeInterval : config.reminders.fadeInterval || 1000,
		fetchInterval : config.reminders.fetchInterval || 10000,
		updateInterval : config.reminders.updateInterval || 2000,
		raspiIp : config.raspiIp || 'http://192.168.1.6:3000',
		reminderPath : 'reminders',
		intervalId : null
}

reminders.fetch = function() 
{
	$.getJSON(reminders.raspiIp + '/' + reminders.reminderPath, function(json, textStatus) {
		
		var list = json.list;
		for(var i in list){
			if(reminders.reminderList.indexOf(list[i])==-1){				
				reminders.reminderList.push(list[i]);
			}
		}	
		
	});
};

reminders.update = function()
{
	if(reminders.reminderList.length-1 >= 0){
		$(reminders.reminderLocation).updateWithText(reminders.reminderList[reminders.reminderIndex],reminders.fadeInterval);
		
		//the next element equals 
		if(reminders.reminderIndex == reminders.reminderList.length-1){
			reminders.reminderIndex = 0;
		}
		else{
			reminders.reminderIndex++;
		}
	}
};

reminders.init = function () {

	this.intervalId = setInterval(function () {
		this.update();
	}.bind(this), reminders.updateInterval);
	
	this.intervalId = setInterval(function () {
		this.fetch();
	}.bind(this), reminders.fetchInterval);

}