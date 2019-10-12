// Let's build a calendar procedurally
var schedule = document.getElementById('scheduler');
var schedule_head = document.getElementById('schedule_head');
var schedule_body = document.getElementById('schedule_body');

// Get today's date
var today = new Date(2019, 11, 1);
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var current_day = days_of_week[today.getDay()];
var current_month = months[today.getMonth()];
var current_year = today.getFullYear();

var first_date_of_the_month = new Date(current_year, today.getMonth(), 01);
var first_day_of_the_month = days_of_week[first_date_of_the_month.getDay()];

var days_last_month = first_date_of_the_month.getDay();
var last_day_of_the_month = new Date(current_year, today.getMonth() + 1, 0);


schedule_head.innerHTML = "<span>" + current_month + "</span>";

var header_squares = 7;
var squares = 35;
var node = '';

var days = 1;

for (var i = 0; i < header_squares; i++)
{
	// Print days headers
	node += "<div class='day week_head " + days_of_week[i] +"'>" + days_of_week[i] + "</div>";
}

for(var i = 0; i < squares; i++)
{
	// Only print days of current month
	if (i < days_last_month || days > last_day_of_the_month.getDate())
	{
		node += "<div class='day'></div>";
	}
	else
	{
		if (days === today.getDate())
		{
			node += "<div class='day today'>" + days + "</div>";
		}
		else
		{
			node += "<div class='day'>" + days + "</div>";
		}
		days++;
	}
}

schedule_body.innerHTML = node;