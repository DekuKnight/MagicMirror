var config = {
    lang: 'en',
    raspiIp : 'http://192.168.1.6:3000',
    time: {
        timeFormat: 12
    },
    weather: {
        //change weather params here:
    	params : {
		    q:'Parsippany, New Jersey',
		    units:'imperial',
		    appid:'85132fad243b9bdbe6469139688a3caa',
		    lang:'en'
		}
    },
    reminders: {
    	fadeInterval:1000
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Good morning, handsome!',
            'Enjoy your day!',
            'How was your sleep?'
        ],
        afternoon: [
            'Hello, beauty!',
            'You look sexy!',
            'Looking good today!'
        ],
        evening: [
            'Wow, you look hot!',
            'You look nice!',
            'Hi, sexy!'
        ]
    },
    calendar: {
        maximumEntries: 10,
        url: "https://p01-calendarws.icloud.com/ca/subscribe/1/n6x7Farxpt7m9S8bHg1TGArSj7J6kanm_2KEoJPL5YIAk3y70FpRo4GyWwO-6QfHSY5mXtHcRGVxYZUf7U3HPDOTG5x0qYnno1Zr_VuKH2M"
    },
    news: {
        feed: 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    }
}