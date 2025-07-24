includeHTML();


/*-----------------------------------*/

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
  //------------------------------------------*/

  start();
}

function start(){
  var mdText = document.getElementById("markdown").innerHTML; // Take the content in xmp#markdown as input - use .html() because it is a jQuery object

  var md = window.markdownit();

  md.set({ html: true, breaks: true, typographer: true });
  var container = window.markdownitContainer;
  md.use(container, 'swiper-slide');
  document.getElementById("markdown").innerHTML=md.render(mdText);

  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    mousewheel: true,
    keyboard: {
          enabled: true,
    },
  });

  new Zooming().listen('img');
}
