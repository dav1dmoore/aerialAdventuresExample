/* Main Navigation */
$(function() {
  $('#hamburgerNav').on('click', function() {
    $('.parentNav').slideToggle(500);
  });

  $('#arrowNav').on('click', function() {
    $('#childNav1').slideToggle(500);
  });

  $('#arrowNav1').on('click', function() {
    $('#childNav2').slideToggle(500);
  });

  const cardsAndArticles = $('.info-card, .info-card article');
  cardsAndArticles.hide();

  $(function() {
    $('tr').on('click', function() {

      const thisCard = $(this).next('.info-card');
      const thisArt = thisCard.find('article');
      const trShadow = $('tr').not(this).not(thisCard).not('tr:lt(2)').not('tr:eq(10)');

      cardsAndArticles
        .not(thisCard)
        .not(thisArt)
        .slideUp(500);

      thisCard
        .slideToggle(500)
        .find(thisArt)
        .slideToggle(500);

      trShadow
        .toggleClass('trHighlight');
    });
  });

});


$('button').on('click', function(e) {
  e.preventDefault();
  var $attCont = $(this).attr('class');
  var $testStrict = /.*-strict/.test($attCont);

  if ($testStrict) {

    console.log($attCont);

    $('button')
      .not(this)
      .siblings('.accordian-panel')
      .slideUp(300);


    $(this)
      .next('.accordian-panel')
      .slideToggle(300);

  } else {
    $(this)
      .next('.accordian-panel')
      .slideToggle(300);
  }
});

/* Offerings Page Tab Panel */
$('a.tab-control').on('click', function(e) {
  e.preventDefault();
  const $this = $(this);
  const $link = $this.attr('href');

  $('.tab-panel').not($link).hide(0);
  $('li.active').removeClass('active');

  $this.
  parent().
  addClass('active');

  $($link).
  fadeIn(700);
});

/* Modal Activity Offerings Page */
$(function() {
  $('#modalLink').on('click', function(e) {
    e.preventDefault();
    $('#modalContainer').css('display', 'flex')
  });

  $(function() {
    $('#modalClose').on('click', function(e) {
      e.preventDefault();
      $('#modalContainer').css('display', 'none');
    });
  });
});


/* Highlight Navigation By matching */
$(function() {
  const $thisPage = document.location.href;
  const $currentPage = $thisPage.match(/[^\/]+$/)[0];
  const thisLink = $('.parentNav>li>a')

  $('.parentNav>li>a').each(function() {
    $link = $(this).attr('href');
    if ($currentPage == $link) {
      $(this).addClass('selected');
    } else {
      return;
    }
    const $thisAnchor = $('a.selected');
    const $next = $thisAnchor.parent().next().find('a');
    const $prev = $thisAnchor.parent().prev().find('a');

    $(document).keydown(function(e) {
      switch (e.which) {
        case 37: // left cursor key
          if ($prev.length == 0) {
            return;
          } else {
            window.location.href = $prev.attr('href');
          }
          break;
        case 39: // right cursor key
          if ($next.length == 0) {
            return;
          } else {
            window.location.href = $next.attr('href');
          }
          break;
        default:
          return; // exit this handler for other keys
      }
      e.preventDefault();
    });

  });

});
