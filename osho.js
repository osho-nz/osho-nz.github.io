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
			$('#osho-meditation-events').empty();

			response.result.items.sort(function(a, b)
			{
				if (a.start.dateTime < b.start.dateTime)
				{
					return -1;
				}

				if (a.start.dateTime > b.start.dateTime)
				{
					return 1;
				}

				return 0;
			});

			if (!response.result.items.length)
			{
				$('#osho-meditation-events').append('<p class="osho-placeholder"><em>Oh dear, there\'s nothing here right now! Check back soon or join the mailing list to find out when the next meditation is.</em></p>');
				return;
			}

			var events = {};
			response.result.items.forEach(function(event)
			{
				if (!events[event.location])
				{
					events[event.location] = [];
				}

				events[event.location].push(event);
			});

			var firstLocation = true;
			for (var location in events)
			{
				$('#osho-meditation-events').append('<hr>');

				firstLocation = false;

				var locationElements = location.split(',');
				locationElements = locationElements.slice(locationElements.length - 3, locationElements.length - 1);
				locationElements[1] = locationElements[1].substring(0, locationElements[1].length - 5);
				$('#osho-meditation-events').append('<h3>' + locationElements + '</h3>');

				if (location.includes('The Yoga Ground'))
				{
					$('#osho-meditation-events').append('<p>We host meditations every Friday and update the schedule below at the beginning of every month, come and join us :)</p>');
				}
				if (location.includes('Beachhaven Community Creche'))
				{
					$('#osho-meditation-events').append('<p>RSVP is important so please contact Manasi at 021 132 5701, <a href="mailto:manasi.wisdom@gmail.com">manasi.wisdom@gmail.com</a> or <a href="http://www.ayurveda-mandala.com" target="_blank">www.ayurveda-mandala.com</a> to confirm if you are joining.</p>');
				}

				events[location].forEach(function(event)
				{
					var localStart = moment.tz(event.start.dateTime, 'Pacific/Auckland');
					var localEnd = moment.tz(event.end.dateTime, 'Pacific/Auckland');

					var eventHtml =
						'<div class="panel osho-panel">' +
							'<div class="panel-body">' +
								'<h4>' + localStart.format('dddd, MMMM Do') + '</h4>' +
								'<h3>' + linkifySummary(event.summary) + '</h3>';

					if (event.description)
					{
						eventHtml +=
								'<p>' + event.description + '</p>';
					}

					eventHtml +=
								'<strong>Cost</strong> $5 to $10 Koha<br />' +
								'<strong>When?</strong> ' + localStart.format('h:mma') + ' - ' + localEnd.format('h:mma')  + '<br>' +
								'<strong>Where?</strong> ' + linkifyLocation(event.location) + ' (<a href="https://www.google.com/maps?q=' + encodeURIComponent(event.location) + '" target="_blank">map</a>)' +
							'</div>' +
						'</div>';

					$('#osho-meditation-events').append(eventHtml);
				});

				if (location.includes('The Yoga Ground'))
				{
					$('#osho-meditation-events').append('<p>Yoga mats and cushions are provided.</p>');
				}
				else if (location.includes('Beachhaven Community Creche'))
				{
					$('#osho-meditation-events').append('<p>There will be tea and refreshments after the meditation.</p>');
				}
			}
		});
	});
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
		event.preventDefault();
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

function linkifySummary(summary)
{
	if (summary.toLowerCase().includes('chakra breath'))
	{
		return '<a href="http://www.osho.com/meditate/active-meditations/chakra-breathing-meditation" target="_blank">' + summary + '</a>';
	}
	else if (summary.toLowerCase().includes('chakra sound'))
	{
		return '<a href="http://www.osho.com/meditate/active-meditations/chakra-sounds-meditation" target="_blank">' + summary + '</a>';
	}
	else if (summary.toLowerCase().includes('devavani'))
	{
		return '<a href="http://www.osho.com/meditate/active-meditations/devavani-meditation" target="_blank">' + summary + '</a>';
	}
	else if (summary.toLowerCase().includes('dynamic'))
	{
		return '<a href="http://www.osho.com/meditate/active-meditations/dynamic-meditation" target="_blank">' + summary + '</a>';
	}
	else if (summary.toLowerCase().includes('evening meeting'))
	{
		return '<a href="http://www.osho.com/meditate/active-meditations/evening-meeting" target="_blank">' + summary + '</a>';
	}
	else if (summary.toLowerCase().includes('kundalini'))
	{
		return '<a href="http://www.osho.com/meditate/active-meditations/kundalini-meditation" target="_blank">' + summary + '</a>';
	}
	else if (summary.toLowerCase().includes('nadabrahma'))
	{
		return '<a href="http://www.osho.com/meditate/active-meditations/nadabrahma-meditation" target="_blank">' + summary + '</a>';
	}
	else if (summary.toLowerCase().includes('nataraj'))
	{
		return '<a href="http://www.osho.com/meditate/active-meditations/nataraj-meditation" target="_blank">' + summary + '</a>';
	}
	else if (summary.toLowerCase().includes('no dimension'))
	{
		return '<a href="http://www.osho.com/meditate/active-meditations/no-dimensions-meditation" target="_blank">' + summary + '</a>';
	}

	return summary;
}

function linkifyLocation(location)
{
	location = location.substring(0, location.indexOf(','));

	if (location === 'The Yoga Ground')
	{
		return '<a href="http://yogaground.co.nz/" target="_blank">' + location + '</a>';
	}

	return location;
}
