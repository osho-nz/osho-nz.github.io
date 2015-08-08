
// Do stuff when the page opens!
$(document).ready(function()
{
	fixSlide();
});

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
		$('#' + sectionId).slideDown();
	}
	else
	{
		$('#lotus-bottom').animate({ 'margin-bottom': '-140px', 'top': '-140px' }, { 'queue': false });
	}
}

