window.addEventListener('load', function() {

  // Debounce from UnderscoreJS
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // Image preload function
  function preloadImage(url) {
   try {
     var img = new Image();
     img.src = url;
   } catch (e) {
      console.log("Couldn't fetch image");
    }
  };
  // Image preload
  preloadImage("../images/about-masked.png");
  preloadImage("../images/1.jpg");
  preloadImage("../images/leo.jpg");
  preloadImage("../images/unnur.jpg");
  preloadImage("../images/default.jpg");

  // Initialize things
  (function(){
    // Initalize gumshoe plugin
    gumshoe.init({
      selector: '#js-scroll a',
      activeClass: 'is-active',
      offset: 10
    });
    // Initalize smoothScroll plugin
    smoothScroll.init();
    // Initalize highlightjs plugin
    var block = document.querySelectorAll('.highlight > pre');
    for (var i = 0; i < block.length; i++) {
      hljs.highlightBlock(block[i]);
    }
  })();

  // Calculate scroll offset and sticky the Table of Contents
  (function(){
    var el = document.getElementById('js-scroll');
    if (el) {
      var elHeight = el.offsetTop;
      var fixClass = 'is-fixed';
      function scroll() {
        if(window.pageYOffset > (elHeight)) {
          el.classList.add(fixClass);
        }
        if(window.pageYOffset < (elHeight)) {
          el.classList.remove(fixClass);
        }
      }
    }
    window.addEventListener('scroll', scroll, false);
    scroll();
  })();

  // Parallax effect for article background images 
  (function(){
    window.onscroll = function() {
      var speed = 20;
      var el = document.getElementById('js-parallax');
      if (el) {
        el.style.backgroundPosition = ("50%" + ((-window.pageYOffset / speed) + 60) + "%");
      }
    }
  })();

  // Move Index background-image with mouse position
  (function(){
    var img = document.getElementById('js-left-img');
    var imgSpeed = -0.01;
    var wx = window.innerWidth;
    var wy = window.innerHeight;

    if(img) {
      window.addEventListener('mousemove', function(e) {
        var x = e.pageX - document.body.offsetLeft;
        var y = e.pageY - document.body.offsetTop;
        var newx = x - wx/2;
        var newy = y - wy/2;
        img.style.backgroundPosition = ( ((1 - newx*imgSpeed)+50) + "%" + ((1 - newy*imgSpeed)+50) + "%");
      });
    }
  })();

  // Switch out About background-image on link hover
  (function(){
      var img = document.getElementById('js-right-img');
      var link = document.getElementsByClassName("js-hover");
      var imgUrl = '1';
      var handleMouseOver = debounce(function() {
      var self = this;

      if (self.dataset.url) {
        img.style.backgroundImage = "url('../images/" + self.dataset.url + ".jpg')";
      }
    }, 50);

    var handleMouseOut = debounce(function() {
      img.style.backgroundImage ="url('../images/" + imgUrl + ".jpg')";
    }, 50);

    for (var i = 0; i < link.length; i++) {
      link[i].addEventListener('mouseover', handleMouseOver, true);
      link[i].addEventListener('mouseout', handleMouseOut, true);
    }
  })();
});
