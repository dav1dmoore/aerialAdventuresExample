$(function() {
	// All Scripts get called here on page load.................................


	// Page Highlighter ..................................................

	var prev, next;
	var file = document.location.href.match(/[^\/]+$/)[0];
	// console.log(file);

	function disabler(selector, val) {
		if (val == undefined) {
			$(selector).addClass('disabled');
		} else {
			$(selector).attr('href', prev);
		}
	}

	$(".topic a").each(function() {
		filelink = $(this).attr("href");
		if (filelink && filelink.indexOf("html") > -1) {
			filelink = filelink.match(/[^\/]+$/)[0];
		}
		// console.log("link: " + filelink);

		if (filelink == file) {
			$(this).addClass("selected");
			$(this).parents(".topic,.course,.section").addClass("selected");

			pageTitle = $(this).text();
			pageIndex = $(this).parent('li').index();


			prev = $(this).parent('li').prev('li').children('a[href]').attr('href'); // regular sibling
			prevText = $(this).parent('li').prev('li').children('a[href]').text();


			console.log("sibling: " + prev + " | " + prevText);
			if (!prev) {
				prev = $(this).parent('li').prev('li').children('ul').find('li:last a[href]').attr('href'); // neice
				prevText = $(this).parent('li').prev('li').children('ul').find('li:last a[href]').text();
				console.log("neice: " + prev + " | " + prevText);
				if (!prev) {
					prev = $(this).parents('.section.selected').prev('li').children('a[href]').attr('href'); // aunt
					prevText = $(this).parents('.section.selected').prev('li').children('a[href]').text();
					console.log("aunt: " + prev + " | " + prevText);
					if (!prev) {
						prev = $(this).parents('.section.selected').prev('.section').children().children('li:last').children('a').attr('href'); //cousin
						prevText = $(this).parents('.section.selected').prev('.section').children().children('li:last').children('a').text();
						console.log("cousin: " + prev + " | " + prevText);
					}
				}
			}
			next = $(this).parent('li').next('li').children('a[href]').attr('href'); // regular sibling
			nextText = $(this).parent('li').next('li').children('a[href]').text();
			console.log("sibling: " + next + " | " + nextText);
			if (!next) {
				next = $(this).parent('li').next('li').children('ul').find('li:first a[href]').attr('href'); // neice
				nextText = $(this).parent('li').next('li').children('ul').find('li:first a[href]').text();
				console.log("neice: " + next + " | " + nextText);
				if (!next) {
					next = $(this).parents('.section.selected').next('li').children('a[href]').attr('href'); // aunt
					nextText = $(this).parents('.section.selected').next('li').children('a[href]').text();
					console.log("aunt: " + next + " | " + nextText);
					if (!next) {
						next = $(this).parents('.section.selected').next('.section').children().children('li:first').children('a').attr('href'); //cousin
						nextText = $(this).parents('.section.selected').next('.section').children().children('li:first').children('a').text();
						console.log("cousin: " + next + " | " + nextText);
					}
				}
			}

			pageIndex -= 1;

			if (/word/i.test(filelink)) {
				$('body').addClass('word');
			} else if (/powerpoint/i.test(this)) {

				$('body').addClass('powerpoint');
			} else if (/excel/i.test(this)) {
				$('body').addClass('excel');
			}

			var commits = $('li.commit u.filename');

			for (i = 0; i < commits.length; i++) {
				commit = commits[i];
				task = i + 1;
				$(commit).prepend(pageIndex + "." + task + " :: " + pageTitle + " :: ");
			}

			// $('.page h2').text(pageTitle);
			// overly aggressive!
			$('title').append(" " + pageTitle);

			// This script is problematic and overly zealous and it shall be temperarily struck down
			// if (pageIndex > 1) {
			// 	$('.page h2').prepend(pageIndex + ": ");
			// }
			// console.log('Prev: ' + prev + ' | Next: ' + next);

			if (prev == undefined) {
				$('.pager .previous').addClass('disabled');
			} else {
				$('.pager .previous').attr('href', prev);
				$('nav .previous').attr("title", prevText);
				$('.page .pager .previous').append(" " + prevText);

			}

			if (next == undefined) {
				$('.pager .next').addClass('disabled');
			} else {
				$('.pager .next').attr('href', next);
				$('nav .next').attr('title', nextText);
				$('.page .pager .next').prepend(nextText + " ");
			}

			// Keyboard Navigation ................................................
			$(document).keydown(function(e) {
				switch (e.which) {
					case 37: // left
						window.location.href = prev;
						break;
					case 39:
						window.location.href = next;
						break;
					default:
						return; // exit this handler for other keys
				}
				e.preventDefault();
			});
		}
	});

	//Accordion
	$("dl.accordion dt").on('click',
		function() {
			var classes = $(this).attr('class');
			var state = $(this).parent().attr('class');

			// Lax mode :: Multiple panels openable at once
			if (state.indexOf("lax") == -1) {
				$(this).toggleClass("selected");
				$(this).next().slideToggle(200);

				// Default mode :: One at a time please
			} else if (classes != "selected") {
				$(this).parent().children('dt').removeAttr('class');
				$(this).siblings('dd').slideUp(200);
				$(this).addClass('selected').next('dd').slideDown(200);
			}

		});

		$(".all-open").children('dt').addClass('selected').next('dd').show();


	//Date Setter
	var today = new Date();
	month = today.getMonth()
	month++;
	today = month + "/" + today.getDate() + "/" + today.getFullYear();
	// console.log(today);

	//Date Setter

	$(".fauxform .date input").val(today);


	// Tab Panel ......................................................
	var lastTab;
	var $tabNav = $('.tabPanel nav').clone();

	$('.page ul.pager').hide();
	$tabNav.insertAfter('.panels');

	$('.tabPanel .panels > article:gt(0)').hide();
	$('.tabPanel nav li:first-child').addClass('selected');

	$('.tabPanel > nav li').each(function() {
		$(this).children('a').wrapInner('<span/>');
		$(this).find('span').prepend(" | ");
		tab = $(this).index() + 1;
		$(this).children('a').prepend(tab + " ");
	});

	$('.tabPanel > nav li').on('click',
		function() {
			var selected = $(this).hasClass('selected');

			if (!selected) {
				$('.tabPanel > nav li').removeAttr('class');
				// $(this).addClass('selected');
				position = $(this).index() + 1;
				$('.tabPanel > nav li:nth-child(' + position + ')').addClass('selected');
				$('.tabPanel .panels > article').slideUp(200).removeClass('open');
				$('.tabPanel .panels > article:nth-child(' + position + ')').slideDown(200).addClass('open');
				$('html,body').animate({scrollTop:0},800);
			};

			lastTab = $('.panels article.open:last-child').length;

			if(lastTab > 0){
				$('.page .pager').show();
			}else{
				$('.page .pager').hide();
			}
		});


	// Smooth Scroller ................................................

	$('.hamburger').click(function() {
		$("nav#primary, #main, .hamburger, header>h1").toggleClass("closed");
	});


	$('ul.courses > li.course > a').click(function() {
		$(this).parent().toggleClass('selected').children('.topic').slideToggle(500);
	});

	$('.course .section > a').click(function() {
		$(this).parent().toggleClass('selected').children('.topic').slideToggle(500);
	});

	$('.test input').click(function() {
		$(this).parent().siblings().removeClass('chosen');
		$(this).parent().toggleClass('chosen');
	});
	// e.preventDefault();
	//
	// var current = $(this).children('.topic');
	// $('.course,.topic').toggleClass('selected');
	// $('.topic').not(current).slideUp();
	// $(this).children('.topic').slideToggle(500);

	// Add smooth scrolling to all links
	$("a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function() {
				window.location.hash = hash;
			});
		}
	});


	// Answer Keys ................................................
	function checkers(id, a) {
		for (i = 0; i < a.length; i++) {
			q = i + 1;
			correct = '#' + id + '.instructions.test li:nth-child(' + q + ')'; // Grab The question
			if (typeof a[i] === "string") { //If answer is a string insert answer
				$(correct + " textarea").text(a[i] + "... (or similar)").addClass('correct');
			} else { // otherwise style the correct answer
				correct += ' dd:nth-of-type(' + a[i] + ')';
				$(correct).addClass('correct');
			}
		}
	}

	if (typeof tests !== "undefined") {
		$('span.reference').addClass('correct'); // when showing test key display page references
		tests.forEach(function(t) {
			checkers(t.id, t.answers);
		})
	}



	// All Scripts get called above here.................................
});
