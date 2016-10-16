$(document).ready(function()
{
	initPetals();
	initLibrary();
});

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
