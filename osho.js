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
			}

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
                else if (summary.toLowerCase().includes('dynamic'))
                {
                    summary = '<a href="http://www.osho.com/meditate/active-meditations/dynamic-meditation" target="_blank">' + summary + '</a>';
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

				var start = moment.tz(event.start.dateTime, 'Pacific/Auckland');
				var end = moment.tz(event.end.dateTime, 'Pacific/Auckland');

				var eventHtml =
					'<div class="panel osho-panel">' +
						'<div class="panel-body">' +
							'<h4>' + start.format('MMMM Do') + '</h4>' +
							'<h3>' + summary + '</h3>';

				if (event.description)
				{
					eventHtml +=
							'<p>' + event.description + '</p>';
				}

				eventHtml +=
							'<strong>Cost</strong> $5<br />' +
							'<strong>When?</strong> ' + start.format('h:mma') + ' - ' + end.format('h:mma')  + '<br>' +
							'<strong>Where?</strong> ' + location + ' (<a href="https://www.google.com/maps?q=' + encodeURIComponent(event.location) + '" target="_blank">map</a>)' +
						'</div>' +
					'</div>';

				$('#osho-meditation-events').append(eventHtml);
			});
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
