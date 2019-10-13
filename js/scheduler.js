var Scheduler = (function()
{
	var active_date = new Date(), 
		week_days = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], 
		months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], 
		hours = ['12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00'],
		header = 7;

	// Public Methods
	function build_month(date)
	{
		// Set global date
		active_date = date;

		// Build template
		body = build_template(date);
		build_head('month', body);
		build_controls('month');
		build_calendar(date, 'month', body);
		set_today();
		
	}

	function build_week(date)
	{
		// Set global date
		active_date = date;

		// Build Template
		body = build_template(date);
		build_head('week', body);
		build_controls('week');
		build_calendar(date, 'week', body);
		set_today();
	}

	function build_day(date)
	{
		// Set global date
		active_date = date;

		// Build Template
		body = build_template(date);
		build_head('day', body);
		build_controls('day');
		build_calendar(date, 'day', body);
	}

	function next(view)
	{
		switch(view)
		{
			case 'month':
				var new_date = new Date(active_date.getFullYear(), active_date.getMonth() + 1, active_date.getDate());
				active_date = new_date;
				build_month(new_date);
				break;

			case 'week':
				var new_date = new Date(active_date.getFullYear(), active_date.getMonth(), active_date.getDate() + 7);
				active_date = new_date;
				build_week(new_date);
				break;

			case 'day':
				var new_date = new Date(active_date.getFullYear(), active_date.getMonth(), active_date.getDate() + 1);
				active_date = new_date;
				build_day(new_date);
				break;

			default:
				console.log('error: no view passed');
				break;
		}
	}

	function prev(view)
	{
		switch(view)
		{
			case 'month':
				var new_date = new Date(active_date.getFullYear(), active_date.getMonth() - 1, active_date.getDate());
				active_date = new_date;
				build_month(new_date);
				break;

			case 'week':
				var new_date = new Date(active_date.getFullYear(), active_date.getMonth(), active_date.getDate() - 7);
				active_date = new_date;
				build_week(new_date);
				break;

			case 'day':
				var new_date = new Date(active_date.getFullYear(), active_date.getMonth(), active_date.getDate() - 1);
				active_date = new_date;
				build_day(new_date);
				break;

			default:
				console.log('error: no view passed');
				break;
		}
	}

	// Private Methods
	function build_template(date)
	{
		active_date = date;

		var scheduler = document.createElement('div'), 
			schedule_head = document.createElement('div'), schedule_body = document.createElement('div'), 
			container = document.getElementById('schedule_container');

		scheduler.id = 'scheduler';
		schedule_head.id = 'schedule_head';
		schedule_body.id = 'schedule_body';

		schedule_head.innerHTML = "<span>" + months[date.getMonth()] + " " + date.getFullYear() + "</span>";

		scheduler.appendChild(schedule_head);
		scheduler.appendChild(schedule_body);

		container.innerHTML = '';
		container.appendChild(scheduler);

		return schedule_body;
	}

	function build_controls(view)
	{
		var controls = document.createElement('div'), 
			prev_but = document.createElement('BUTTON'), 
			next_but = document.createElement('BUTTON'), 
			month_view = document.createElement('A'), 
			week_view = document.createElement('A'), 
			day_view = document.createElement('A'), 
			schedule_head = document.getElementById('schedule_head');

		controls.id = 'control';		
		prev_but.id = 'prev';
		prev_but.innerHTML = 'Prev';
		next_but.id = 'next';
		next_but.innerHTML = 'Next';

		controls.appendChild(prev_but);
		controls.appendChild(next_but);
		
		month_view.setAttribute('href', '#');
		month_view.innerHTML = "Month";
		
		week_view.setAttribute('href', '#');
		week_view.innerHTML = "Week";
		
		day_view.setAttribute('href', '#');
		day_view.innerHTML = "Day";

		switch(view)
		{
			case 'month':
				schedule_body.style.display = 'grid';
				schedule_body.style.gridTemplateColumns = 'auto auto auto auto auto auto auto';
		
				controls.appendChild(week_view);
				controls.appendChild(day_view);

				week_view.addEventListener('click', function()
				{
					build_week(active_date);
				}, false);

				day_view.addEventListener('click', function()
				{
					build_day(active_date);
				}, false);
				break;

			case 'week':
				schedule_body.style.display = 'grid';
				schedule_body.style.gridTemplateColumns = 'auto auto auto auto auto auto auto';
		
				controls.appendChild(month_view);
				controls.appendChild(day_view);

				month_view.addEventListener('click', function()
				{
					build_month(active_date);
				}, false);

				day_view.addEventListener('click', function()
				{
					build_day(active_date);
				}, false);
				break;

			case 'day':
				controls.appendChild(month_view);
				controls.appendChild(week_view);

				month_view.addEventListener('click', function()
				{
					build_month(active_date);
				}, false);

				week_view.addEventListener('click', function()
				{
					build_week(active_date);
				}, false);
				break;

			default:
				console.log('error: no view passed');
				break;
		}

		schedule_head.appendChild(controls);

		prev_but.addEventListener('click', function()
		{
			prev(view);
		}, false);
		next_but.addEventListener('click', function()
		{
			next(view);
		}, false);
	}

	function build_head(view, body)
	{
		var header_squares = 7;

		switch(view)
		{
			case 'month':
				for (var i = 0; i < header_squares; i++)
				{
					var node = document.createElement('div');
					node.classList.add('day', 'week_head', week_days[i]);
					node.innerHTML = week_days[i];

					body.appendChild(node);
				}
				break;

			case 'week':
				for (var i = 0; i < header_squares; i++)
				{
					var node = document.createElement('div');
					node.classList.add('day', 'week_head', week_days[i]);
					node.innerHTML = week_days[i];

					body.appendChild(node);
				}
				break;

			case 'day':
				var node = document.createElement('div');
				node.classList.add('day', 'week_head');
				node.innerHTML = week_days[active_date.getDay()] + ", " + months[active_date.getMonth()] + " " + active_date.getDate() + ", " + active_date.getFullYear();

				body.appendChild(node);
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
				var squares = 35,
					fir_of_curr_mon = new Date(date.getFullYear(), date.getMonth(), 1),
					las_of_curr_mon = new Date(date.getFullYear(), date.getMonth() + 1, 0);

				if ((fir_of_curr_mon.getDay() > 4 && las_of_curr_mon.getDate() > 30) || 
					(fir_of_curr_mon.getDay() > 5 && las_of_curr_mon.getDate() > 29))
				{
					squares = 42;
				}

				var day_to_print = new Date(fir_of_curr_mon.getFullYear(), fir_of_curr_mon.getMonth(), fir_of_curr_mon.getDate() - fir_of_curr_mon.getDay());

				for(var i = 0; i < squares; i++)
				{
					var day_container = document.createElement('div'),
						date_node = document.createElement('div');
					
					day_container.classList.add('day');
					date_node.id = day_to_print.getDate();
					date_node.classList.add('date_icon');
					date_node.innerHTML = day_to_print.getDate();
					day_container.appendChild(date_node);

					if (day_to_print.getMonth() === active_date.getMonth())
					{
						day_container.classList.add('active');
					}

					day_to_print = new Date(day_to_print.getFullYear(), day_to_print.getMonth(), day_to_print.getDate() + 1);
					body.appendChild(day_container);
				}
				break;

			case 'week':
				var squares = 7,
					fir_of_curr_wk = new Date(active_date.getFullYear(), active_date.getMonth(), active_date.getDate() - active_date.getDay());
				
				for (var i = 0; i < squares; i++)
				{
					var day_container = document.createElement('div'),
						date_node = document.createElement('div');
					
					day_container.classList.add('day_week_view');
					date_node.id = fir_of_curr_wk.getDate();
					date_node.classList.add('date_icon');
					date_node.innerHTML = fir_of_curr_wk.getDate();
					day_container.appendChild(date_node);

					if (fir_of_curr_wk.getMonth() === active_date.getMonth())
					{
						day_container.classList.add('active');
					}
					fir_of_curr_wk = new Date(fir_of_curr_wk.getFullYear(), fir_of_curr_wk.getMonth(), fir_of_curr_wk.getDate() + 1);
					body.appendChild(day_container);
				}
				break;
			
			case 'day':
				var total_hours = 24;
				fir_hr_of_day = new Date(active_date.getFullYear(), active_date.getMonth(), active_date.getDate(), 0);

				for (var i = 0; i < total_hours; i++)
				{
					var hour_node = document.createElement('div'),
						hour_container = document.createElement('div');

					hour_node.classList.add('hour_icon');
					hour_node.id = hours[fir_hr_of_day.getHours()];
					if(fir_hr_of_day.getHours() > 11)
					{
						hour_node.innerHTML = hours[fir_hr_of_day.getHours() - 12];
					}
					else
					{
						hour_node.innerHTML = hours[fir_hr_of_day.getHours()];
					}

					if(fir_hr_of_day.getHours() > 6 && fir_hr_of_day.getHours() < 18)
					{
						hour_container.classList.add('active');
					}
					
					hour_container.appendChild(hour_node);
					hour_container.classList.add('hour');
					fir_hr_of_day = new Date(fir_hr_of_day.getFullYear(), fir_hr_of_day.getMonth(), fir_hr_of_day.getDate(), fir_hr_of_day.getHours() + 1);
					body.appendChild(hour_container);
				}
				break;

			default:
				console.log('error: no view passed');
				break;
		}
	}

	function set_today()
	{
		var today = new Date();

		if ((today.getMonth() === active_date.getMonth()) && (today.getFullYear() === active_date.getFullYear()))
		{
			var node = document.getElementById(today.getDate());
			node.parentElement.classList.add('today');
		}
	}

	return {
		month: build_month,
		week: build_week,
		day: build_day,
		prev: prev,
		next: next
	};

})();

var d = new Date();
Scheduler.month(d);