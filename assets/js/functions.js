$( document ).ready(function() {

  
  // ScrollMagic
  // init controller
  var controller = new ScrollMagic.Controller();

  // create a scene
  new ScrollMagic.Scene({	offset: 100	}).setClassToggle('#logo', 'lifted').addTo(controller); 
    
  new ScrollMagic.Scene({ triggerElement: '#contacto', offset: 100 }).setClassToggle('#footer', 'lifted').addTo(controller);
    
  new ScrollMagic.Scene({offset:100}).setClassToggle('#nav', 'show').addTo(controller);
    
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {
  
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
  
      // Store hash
      var hash = this.hash;
      scrollTo(hash);
    } // End if
  });

});



$(window).on('load', function() {
  var imgs = document.querySelectorAll('img[data-src]');
  var loaded = 0;
  var progress = 0;
  imgs.forEach(function(v,k,p) {
    v.onload = v.onerror = function() {
      loaded++;
      progress = loaded / imgs.length * 100;
      document.getElementById('progress').style.width = progress + "%";
      console.log('loaded', progress, '%', v.src)
      
      if (progress === 100) {
        $('#cover > *').hide();
         $("#cover").fadeOut(1000);
        }
    }
    v.src = v.dataset.src;
  
  })
  
  // Animate On Scroll
  AOS.init();

  $('#logo').on('click', function () {
    if ($(this).hasClass('lifted'))
      scrollTo('#screen1')
    else
      scrollTo('#nosotros')
  })
});



function scrollTo (hash) {
  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
    scrollTop: $(hash).offset().top
  }, 1000, function(){
  
    // Add hash (#) to URL when done scrolling (default click behavior)
    window.location.hash = hash;
  });

}