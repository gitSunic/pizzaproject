$('#attr-co').click(function () {
	if ($('#attr-co-open').css("display") == "none") {
		$('#attr-ti-open').hide();
		$('#attr-me-open').hide();
		$('#attr-co-open').slideDown(150);
	} else {
		$('#attr-co-open').slideUp(150);
	}
});
$('#attr-ti').click(function () {
	if ($('#attr-ti-open').css("display") == "none") {
		$('#attr-co-open').hide();
		$('#attr-me-open').hide();
		$('#attr-ti-open').slideDown(150);
	} else {
		$('#attr-ti-open').slideUp(150);
	}
});
$('#attr-me').click(function () {
	if ($('#attr-me-open').css("display") == "none") {
		$('#attr-co-open').hide();
		$('#attr-ti-open').hide();
		$('#attr-me-open').slideDown(250);
	} else {
		$('#attr-me-open').slideUp(250);
	}
});