$(document).ready(function()
{
	gapi.load('client', initGoogleClient);
	initPetals();
	initLibrary();
});

function initGoogleClient()
{
	gapi.client.setApiKey('AIzaSyA86lCP-YurzGlB0i3dsj1voDKoqpfX6ro');
	gapi.client.load('calendar', 'v3')
	.then(function()
	{
		gapi.client.calendar.events.list(
		{
			'calendarId': 'info@osho.nz',
			'maxResults': 8,
			'timeMin': new Date().toISOString()
		})
		.then(function(response)
		{
			console.log(response);
			response.result.items.forEach(function(event)
			{
				var summary = event.summary;
				if (summary.toLowerCase().includes('chakra breath'))
				{
					summary = '<a href="http://www.osho.com/meditate/active-meditations/chakra-breathing-meditation" target="_blank">' + summary + '</a>';
				}
				else if (summary.toLowerCase().includes('chakra sound'))
				{
					summary = '<a href="http://www.osho.com/meditate/active-meditations/chakra-sounds-meditation" target="_blank">' + summary + '</a>';
				}
				else if (summary.toLowerCase().includes('devavani'))
				{
					summary = '<a href="http://www.osho.com/meditate/active-meditations/devavani-meditation" target="_blank">' + summary + '</a>';
				}
				else if (summary.toLowerCase().includes('evening meeting'))
				{
					summary = '<a href="http://www.osho.com/meditate/active-meditations/evening-meeting" target="_blank">' + summary + '</a>';
				}
				else if (summary.toLowerCase().includes('kundalini'))
				{
					summary = '<a href="http://www.osho.com/meditate/active-meditations/kundalini-meditation" target="_blank">' + summary + '</a>';
				}
				else if (summary.toLowerCase().includes('nadabrahma'))
				{
					summary = '<a href="http://www.osho.com/meditate/active-meditations/nadabrahma-meditation" target="_blank">' + summary + '</a>';
				}
				else if (summary.toLowerCase().includes('nataraj'))
				{
					summary = '<a href="http://www.osho.com/meditate/active-meditations/nataraj-meditation" target="_blank">' + summary + '</a>';
				}
				else if (summary.toLowerCase().includes('no dimension'))
				{
					summary = '<a href="http://www.osho.com/meditate/active-meditations/no-dimensions-meditation" target="_blank">' + summary + '</a>';
				}

				var location = event.location.substring(0, event.location.indexOf(','));
				if (location === 'The Yoga Ground')
				{
					location = '<a href="http://yogaground.co.nz/" target="_blank">' + location + '</a>';
				}

				var eventHtml =
					'<div class="panel osho-panel">' +
						'<div class="panel-body">' +
							'<h4>' + formatDate(new Date(event.start.dateTime)) + '</h4>' +
							'<h3>' + summary + '</h3>';

				if (event.description)
				{
					eventHtml +=
							'<p>' + event.description + '</p>';
				}

				eventHtml +=
							'<strong>Cost</strong> $5<br />' +
							'<strong>When?</strong> ' + formatTime(new Date(event.start.dateTime)) + ' - ' + formatTime(new Date(event.end.dateTime)) + '<br>' +
							'<strong>Where?</strong> ' + location + ' (<a href="https://www.google.com/maps?q=' + encodeURIComponent(event.location) + '" target="_blank">map</a>)' +
						'</div>' +
					'</div>'

				$('#osho-meditation-events').append(eventHtml);
			});
		});
	});
}

function handleError(err)
{
	console.error(err);
}

function initPetals()
{
	$('#osho-facebook-button').mouseover(function()
	{
		showPetal('facebook');
	});
	$('#osho-facebook-button').mouseout(function()
	{
		hidePetal('facebook');
	});

	$('#osho-info-button').mouseover(function()
	{
		showPetal('info');
	});
	$('#osho-info-button').mouseout(function()
	{
		hidePetal('info');
	});

	$('#osho-meditation-button').mouseover(function()
	{
		showPetal('meditation');
	});
	$('#osho-meditation-button').mouseout(function()
	{
		hidePetal('meditation');
	});

	$('#osho-library-button').mouseover(function()
	{
		showPetal('library');
	});
	$('#osho-library-button').mouseout(function()
	{
		hidePetal('library');
	});
}

function initLibrary()
{
	$('#osho-library-tabs a').click(function(event)
	{
		event.preventDefault()
		$(this).tab('show');
	});
}

function showPetal(petal)
{
	$('#osho-lotus-petal-' + petal).stop().fadeIn({ 'duration': 200, 'queue': false });
}

function hidePetal(petal)
{
	$('#osho-lotus-petal-' + petal).stop().fadeOut({ 'duration': 200, 'queue': false });
}

function goTo(section)
{
	$('html, body').animate({scrollTop: $('#osho-' + section).offset().top}, 'slow');
	hidePetal(section);
}

function formatDate(date)
{
	var monthNames =
	[
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	var month = monthNames[date.getMonth()];

	var day = date.getDate();
	if (day === 1 || day === 21 || day === 31)
	{
		day += 'st';
	}
	else if (day === 2 || day === 22)
	{
		day += 'nd';
	}
	else if (day === 3 || day === 23)
	{
		day += 'rd';
	}
	else
	{
		day += 'th';
	}

	return month + ' ' + day;
}

function formatTime(date)
{
	var hour = date.getHours() % 12;
	if (hour === 0)
	{
		hour = 12;
	}

	var minute = date.getMinutes();

	var time = hour;
	if (minute !== 0)
	{
		time += ':' + minute;
	}

	if (date.getHours() >= 12)
	{
		time += 'pm';
	}
	else
	{
		time += 'am';
	}

	return time;
}
