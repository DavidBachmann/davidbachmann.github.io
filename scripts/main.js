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

  // Image preload
  function preloadImage(url) {
   try {
     var _img = new Image();
     _img.src = url;
   } catch (e) {
      console.log("Couldn't fetch image");
    }
  };

  // Initialize things
  (function(){
    // Initalize gumshoe plugin
    gumshoe.init({
      selector: '#js-scroll a', // Default link selector (must use a valid CSS selector)
      activeClass: 'is-active' // Class to apply to active navigation link and it's parent list item
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

  // Parallax effect for background images 
  (function(){
    window.onscroll = function() {
      var speed = 20;
      var el = document.getElementById('js-parallax');
      if (el) {
        el.style.backgroundPosition = ("50%" + ((-window.pageYOffset / speed) + 60) + "%");
      }
    }
  })();

  // Move left background-image with mouse position
  (function(){
    var img = document.getElementById('js-left-img');
    var imgxSpeed = -0.01;
    var imgySpeed = -0.01;
    var wx = window.innerWidth;
    var wy = window.innerHeight;

    if(img) {
      window.addEventListener('mousemove', function(e) {
        var x = e.pageX - document.body.offsetLeft;
        var y = e.pageY - document.body.offsetTop;
        var newx = x - wx/2;
        var newy = y - wy/2;
        img.style.backgroundPosition = ( ((1 - newx*imgxSpeed)+50) + "%" + ((1 - newy*imgySpeed)+50) + "%");
      });
    }
  })();

  // Switch out background image on link hover
  (function(){
    var img = document.getElementById('js-left-img');
    var linkParent = document.getElementsByClassName("js-link-parent");
    var imgUrl = 'default';
    var handleMouseOver = debounce(function() {
      var self = this;
      if (self.dataset.url) {
        img.style.backgroundImage = "url('../images/" + self.dataset.url + "-preview.jpg')";
      }
    }, 50);

    var handleMouseOut = debounce(function() {
      img.style.backgroundImage ="url('../images/" + imgUrl + "-preview.jpg')";
    }, 50);

    for (var i = 0; i < linkParent.length; i++) {
      linkParent[i].addEventListener('mouseover', handleMouseOver, true);
      linkParent[i].addEventListener('mouseout', handleMouseOut, true);
      preloadImage("../images/" + linkParent[i].dataset.url + "-preview.jpg");
    }
  })();

});
