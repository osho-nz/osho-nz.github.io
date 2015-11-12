
var selectedSection = null;

// Do stuff when the page opens!
$(document).ready(function()
{
	fixSlide();
	initPetals();
});

// Show the given petal.
function showPetal(petal)
{
	$('#lotus-petal-' + petal).stop().fadeIn({ 'duration': 200, 'queue': false });
}

// Hide the given petal.
function hidePetal(petal)
{
	if (petal === selectedSection)
	{
		return;
	}

	$('#lotus-petal-' + petal).stop().fadeOut({ 'duration': 200, 'queue': false });
}

// The jQuery slide functions were jumpy, this fixes it.
function fixSlide()
{
	$('.section').before('<div class="slideFixer"></div>');
	$('.section').after('<div class="slideFixer"></div>');
}

// Select the given section (toggles open/close).
function selectSection(sectionId)
{
	$('#lotus-bottom').animate({ 'margin-bottom': '0px', 'top': '0px' });

	var originalDisplay = $('#' + sectionId).css('display');

	$('.section').slideUp();

	if (originalDisplay === 'none')
	{
		selectedSection = sectionId;
		$('#' + sectionId).slideDown();
	}
	else
	{
		selectedSection = null;
		$('#lotus-bottom').animate({ 'margin-bottom': '-140px', 'top': '-140px' }, { 'queue': false });
	}

	hidePetal('facebook');
	hidePetal('info');
	hidePetal('meditation');
	hidePetal('library');
}

// Initialise petal feedback.
function initPetals()
{
	$('#facebook-button').mouseover(function()
	{
		showPetal('facebook');
	});
	$('#facebook-button').mouseout(function()
	{
		hidePetal('facebook');
	});

	$('#info-button').mouseover(function()
	{
		showPetal('info');
	});
	$('#info-button').mouseout(function()
	{
		hidePetal('info');
	});

	$('#meditation-button').mouseover(function()
	{
		showPetal('meditation');
	});
	$('#meditation-button').mouseout(function()
	{
		hidePetal('meditation');
	});

	$('#library-button').mouseover(function()
	{
		showPetal('library');
	});
	$('#library-button').mouseout(function()
	{
		hidePetal('library');
	});
}

function goToMeditations()
{
	var section = $('#meditation');

	if (section.css('display') === 'none')
	{
		showPetal('meditation');
		selectSection('meditation');
	}

	var meditationPosition = section.offset();
	$("html, body").animate({scrollTop: meditationPosition.top}, "slow");
}
