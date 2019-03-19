$(window).on('load', (function() {
	$('#loading').hide();
	$('#body').css({'visibility':'visible'});
	var xmax = $('#header').width() - 50;
	var ymax = $('#header').height() - 50;
	for (var i = 0; i < 10; i++) {
		var x = Math.floor(Math.random() * xmax) + "px";
		var y = Math.floor(Math.random() * ymax) + "px";
		var el = "<div class=\"pizza-img\" style=\"top:"+y+";left:"+x+";animation:pizza-"+(i+1)+" 7s infinite linear;\"></div>";
		$('#header').prepend(el);
	}
	$('.pizza-img').each(function() {
		$(this).css({'transition':'1s linear 0'});
		pizzaMovie($(this).index());
	});
	function pizzaMovie(id) {
		nxs = ($('.pizza-img:eq('+id+')').css('left'));
		nys = $('.pizza-img:eq('+id+')').css('top');				
		nx = parseInt(nxs.substr(0,nxs.length-2));
		ny = parseInt(nxs.substr(0,nys.length-2));
		x = Math.floor(Math.random() * xmax);
		y = Math.floor(Math.random() * ymax);
		var t = Math.pow((Math.pow((nx - x),2) + Math.pow((ny - y),2)),0.5)*0.02;
		$('.pizza-img:eq('+id+')').css({'transition':t+'s linear','top':y+'px','left':x+'px'});
		setTimeout(pizzaMovie, t*1000, id);
	}
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
}));
