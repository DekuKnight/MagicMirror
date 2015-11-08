var raspiIp = 'http://192.168.1.6:3000/reminders';

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

function roundVal(temp)
{
	return Math.round(temp);
}

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

jQuery(document).ready(function($) {
	
	var eventList = [];
	var reminderList = [];
	var reminderIndex = 0;
	var news = [];
	var newsIndex = 0;
	
	var lang = window.navigator.language;
	moment.lang(lang);
	
	var weatherParams = {
		    'q':'Parsippany, New Jersey',
		    'units':'imperial',
		    'appid':'85132fad243b9bdbe6469139688a3caa'
		};
	
	(function updateTime()
	{
		var now = moment();
		var date = now.format('LLLL').split(' ',4);
		date = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3];

		$('.date').html(date);
		$('.time').html(now.format('hh') + ':' + now.format('mm') + '<span class="sec">'+now.format('ss')+ '</span>');

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

		$('.calendar').updateWithText(table,1000);

		setTimeout(function() {
        	updateCalendar();
        }, 1000);
	})();

	(function fetchReminders() 
	{
		$.getJSON(raspiIp, function(json, textStatus) {
			
			var list = json.list;
			for(var i in list){
				if(reminderList.indexOf(list[i])==-1){				
					reminderList.push(list[i]);
				}
			}	
			
		});
		
		setTimeout(function() {
			fetchReminders();
		}, 10000);
	})();
	
	(function updateReminders(){
		if(reminderList.length-1 >= 0){
			$('.reminder').updateWithText(reminderList[reminderIndex],1000);
			
			//the next element equals 
			if(reminderIndex == reminderList.length-1){
				reminderIndex = 0;
			}
			else{
				reminderIndex++;
			}
		}
		
		setTimeout(function() {
			updateReminders();
		}, 2000);
	})();
	
	(function updateCurrentWeather()
	{
		var iconTable = {
			'01d':'wi-day-sunny',
			'02d':'wi-day-cloudy',
			'03d':'wi-cloudy',
			'04d':'wi-cloudy-windy',
			'09d':'wi-showers',
			'10d':'wi-rain',
			'11d':'wi-thunderstorm',
			'13d':'wi-snow',
			'50d':'wi-fog',
			'01n':'wi-night-clear',
			'02n':'wi-night-cloudy',
			'03n':'wi-night-cloudy',
			'04n':'wi-night-cloudy',
			'09n':'wi-night-showers',
			'10n':'wi-night-rain',
			'11n':'wi-night-thunderstorm',
			'13n':'wi-night-snow',
			'50n':'wi-night-alt-cloudy-windy'
		}


		$.getJSON('http://api.openweathermap.org/data/2.5/weather', weatherParams, function(json, textStatus) {

			var temp = roundVal(json.main.temp);
			var wind = json.wind.speed;

			var iconClass = iconTable[json.weather[0].icon];
			var icon = $('<span/>').addClass('icon').addClass('dimmed').addClass('wi').addClass(iconClass);
			$('.temp').updateWithText(icon.outerHTML()+temp+'&deg; F', 1000);

			
		});

		setTimeout(function() {
			updateCurrentWeather();
		}, 60000);
	})();
	
	(function updateWeatherForecast()
	{
		var iconTable = {
			'01d':'wi-day-sunny',
			'02d':'wi-day-cloudy',
			'03d':'wi-cloudy',
			'04d':'wi-cloudy-windy',
			'09d':'wi-showers',
			'10d':'wi-rain',
			'11d':'wi-thunderstorm',
			'13d':'wi-snow',
			'50d':'wi-fog',
			'01n':'wi-night-clear',
			'02n':'wi-night-cloudy',
			'03n':'wi-night-cloudy',
			'04n':'wi-night-cloudy',
			'09n':'wi-night-showers',
			'10n':'wi-night-rain',
			'11n':'wi-night-thunderstorm',
			'13n':'wi-night-snow',
			'50n':'wi-night-alt-cloudy-windy'
		}
			$.getJSON('http://api.openweathermap.org/data/2.5/forecast', weatherParams, function(json, textStatus) {

			var forecastData = {};

			for (var i in json.list) {
				var forecast = json.list[i];
				var dateKey  = forecast.dt_txt.substring(0, 10);

				if (forecastData[dateKey] == undefined) {
					forecastData[dateKey] = {
						'timestamp':forecast.dt * 1000,
						'icon':forecast.weather[0].icon,
						'temp_min':forecast.main.temp,
						'temp_max':forecast.main.temp
					};
				} else {
					forecastData[dateKey]['icon'] = forecast.weather[0].icon;
					forecastData[dateKey]['temp_min'] = (forecast.main.temp < forecastData[dateKey]['temp_min']) ? forecast.main.temp : forecastData[dateKey]['temp_min'];
					forecastData[dateKey]['temp_max'] = (forecast.main.temp > forecastData[dateKey]['temp_max']) ? forecast.main.temp : forecastData[dateKey]['temp_max'];
				}

			}

			var loc = $('<span class=".loc">'+ weatherParams['q'] +'</span>');
			$('.windsun').updateWithText(loc.addClass('forecast-table'),1000)			
			
			var forecastTable = $('<table />').addClass('forecast-table');
			var opacity = 1.155;
			
			for (var i in forecastData) {
				if(opacity <= 1){
					var forecast = forecastData[i];
					var iconClass = iconTable[forecast.icon];
					var dt = new Date(forecast.timestamp);
					var row = $('<tr />').css('opacity', opacity);
					
					if(opacity == 1){
						row.append($('<td/>').addClass('day').html("Today"));
					} else{					
						row.append($('<td/>').addClass('day').html(moment.weekdays(dt.getDay())));
					}
					row.append($('<td/>').addClass('icon-small').addClass('wi').addClass(iconClass));
					row.append($('<td/>').addClass('temp-max').html(roundVal(forecast.temp_max)+'&deg;'));
					row.append($('<td/>').addClass('temp-min').html('/'+roundVal(forecast.temp_min)+'&deg;'));
					
					forecastTable.append(row);
				}
				opacity -= 0.155;							
			}

			$('.forecast').updateWithText(forecastTable, 1000);
		});

		setTimeout(function() {
			updateWeatherForecast();
		}, 60000);
	})();
	
});

if(annyang){
	var commands = {
			'say *term': function(term){
				$('.conversation').flashMessage(term, 1000, 2000);
				speak(term);
			},
			'who are you': function(){
				var term = 'I am Kaylee';
				$('.conversation').flashMessage(term, 1000, 2000);
				speak(term);
			},
			'hide (the) weather': function(){
				$('.windsun').fadeOut(500);
				$('.temp').fadeOut(500);
				$('.forecast').fadeOut(500);
				speak('Hiding the weather');
			},
			'show (the) weather': function(){
				$('.windsun').fadeIn(500);
				$('.temp').fadeIn(500);
				$('.forecast').fadeIn(500);
				speak('Showing the weather');
			},
			'hide (my to do) list': function(){
				$('.calendar').fadeOut(500);
				speak('Hiding your to do list');
			},
			'show (my to do) list': function(){
				$('.calendar').fadeIn(500);
				speak('Showing your to do list');
			},
			'hide (the) time': function(){
				$('.time').fadeOut(500);
				$('.date').fadeOut(500);
				speak('Hiding the time');
			},
			'show (the) time': function(){
				$('.time').fadeIn(500);
				$('.date').fadeIn(500);
				speak('Showing the time');
			},
			'good night (kaylee)': function(){
				$('.conversation').flashMessage('Goodnight sir', 1000, 2000);
				speak('Good night sir');
				$('.time').fadeOut(500);
				$('.date').fadeOut(500);
				$('.calendar').fadeOut(500);
				$('.windsun').fadeOut(500);
				$('.temp').fadeOut(500);
				$('.forecast').fadeOut(500);
			},
			'good morning (kaylee)': function(){
				$('.conversation').flashMessage('Good morning sir', 1000, 2000);
				speak('Good morning sir');
				$('.time').fadeIn(500);
				$('.date').fadeIn(500);
				$('.calendar').fadeIn(500);
				$('.windsun').fadeIn(500);
				$('.temp').fadeIn(500);
				$('.forecast').fadeIn(500);
			},
	};
	
	var speak = function(term){
		var msg = new SpeechSynthesisUtterance(term);
		var voices = window.speechSynthesis.getVoices();
		msg.voice = voices[2];
		msg.pitch = 0;
		window.speechSynthesis.speak(msg);
	}
	
	annyang.addCommands(commands);
	annyang.debug();
	annyang.start();
}