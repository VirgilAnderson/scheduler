var scheduler = (function()
{
	var week_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var header = 7;
	var squares = 35;

	// Public Methods
	function build_month(date)
	{
		// Build template
		body = build_template(date);
		build_head('month', body);
		build_calendar(date, 'month', body);
	}

	function build_week()
	{
		console.log('week');
	}

	function build_day()
	{
		console.log('day');
	}

	// Private Methods
	function build_template(date)
	{
		var scheduler = document.createElement('div');
		var schedule_head = document.createElement('div');
		var schedule_body = document.createElement('div');

		scheduler.id = 'scheduler';
		schedule_head.id = 'schedule_head';
		schedule_body.id = 'schedule_body';

		schedule_head.innerHTML = "<span>" + months[date.getMonth()] + " " + date.getFullYear() + "</span>";

		scheduler.appendChild(schedule_head);
		scheduler.appendChild(schedule_body);

		var container = document.getElementById('schedule_container');
		container.appendChild(scheduler);

		return schedule_body;
	}

	function build_head(view, body)
	{
		var header_squares = 7;

		switch(view)
		{
			case 'month':
				for (var i = 0; i < header_squares; i++)
				{
					// Print days headers
					var node = document.createElement('div');
					node.classList.add('day', 'week_head', week_days[i]);
					node.innerHTML = week_days[i];
					body.appendChild(node);
				}
				break;

			case 'week':
				console.log('week_view');
				break;

			case 'day':
				console.log('day_view');
				break;

			default:
				console.log('error: no view passed');
				break;

		}
	}

	function build_calendar(date, view, body)
	{
		

		switch(view)
		{
			case 'month':
				var squares = 35;
				var fir_of_curr_mon = new Date(date.getFullYear(), date.getMonth(), 01);
				var las_of_curr_mon = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				
				var lm_days = fir_of_curr_mon = fir_of_curr_mon.getDay();
				var days = 1;

				for (var i = 0; i < squares; i++)
				{
					var node = document.createElement('div');
					node.classList.add('day');
					
					// Only print the days of the selected month
					if (i >= lm_days && days <= las_of_curr_mon.getDate())
					{
						node.innerHTML = days;
						days++;					
					}
					
					body.appendChild(node);

				}
				break;

			case 'week':
				break;
			
			case 'day':
				break;

			default:
				console.log('error: no view passed');
				break;
		}
	}

	return {
		month: build_month,
		week: build_week,
		day: build_day
	};

})();

var d = new Date(2019, 01, 14);
scheduler.month(d);