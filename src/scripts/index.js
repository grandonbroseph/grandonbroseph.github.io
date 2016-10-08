(function(){
  var swfobject = require("./swfobject");
  var parelax = require("./parelax");
  var overlay = document.querySelector(".overlay");

  function playSWF(id) {
    var element = document.getElementById("swf");
    swfobject.embedSWF("dist/flash/" + id + ".swf", element, 640, 480, 10, "", {}, {}, {}, function(e) {
      if(e.success){
        e.ref.tabIndex = "-1";
        e.ref.focus();
      }
    });
    overlay.classList.remove("invisible");

    function exit() {
      overlay.classList.add("invisible");
      setTimeout(function() {
        var swf = document.getElementById("swf");
        swf && overlay.removeChild(swf);
        element = document.createElement("div");
        element.id = "swf";
        overlay.appendChild(element);
      }, 500);
    }

    overlay.addEventListener("click", exit);
    overlay.addEventListener("keydown", function(event) {
      event.key === "Escape" && exit();
    });
  }

  [].slice.call(document.querySelectorAll("a.image.flash")).some(function(element) {
    element.addEventListener("click", function() {
      var id;
      for (var i = 0, attribute; attribute = this.attributes[i ++];) {
        if (attribute.name === "data-flash") {
          id = attribute.value;
          break;
        }
      }
      playSWF(id);
    });
  });

  var image = document.querySelector(".banner-wrap");
  var header = document.querySelector("header");
  var headerParent = header.parentNode;
  var headerSibling = header.nextSibling;
  var scrollPos = 0;
  var scrollMax = image.getBoundingClientRect().height;
  var scrollTick = false;
  var fragment;

  window.addEventListener("scroll", function(e) {
    scrollPos = document.body.scrollTop;
    scrollMax = image.getBoundingClientRect().height;
    if (!scrollTick) {
      window.requestAnimationFrame(function() {
        if (scrollPos > scrollMax) {
          if (header.parentNode && header.parentNode === headerParent) {
            fragment = document.createDocumentFragment();
            fragment.appendChild(headerParent.removeChild(header));
            header.classList.add("sticky");
            document.body.appendChild(fragment);
          }
        } else {
          if (header.parentNode && header.parentNode !== headerParent) {
            fragment = document.createDocumentFragment();
            fragment.appendChild(header.parentNode.removeChild(header));
            headerParent.insertBefore(fragment, headerSibling);
            header.classList.remove("sticky");
          }
        }
        scrollTick = false;
      });
    }
    scrollTick = true;
  });
})();
