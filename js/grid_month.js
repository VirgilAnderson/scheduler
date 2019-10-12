// Let's build a calendar procedurally
var schedule = document.getElementById('scheduler');
var days = 31;
var node = '';

for(var i = 0; i < days; i++)
{
	node += "<div class=''>O</div>";
}

schedule.innerHTML = node;