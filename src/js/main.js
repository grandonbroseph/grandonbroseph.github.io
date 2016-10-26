import modal from './components/modal'
import thumb from './components/thumb'
import gallery from './gallery'

var mobile = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
var touch = 'ontouchstart' in window || navigator.maxTouchPoints
var flash = false

try {
  flash = !!new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
}
catch(e) {
  flash = typeof navigator.mimeTypes['application/x-shockwave-flash'] !== 'undefined'
}

var wrap, hero, heroImage, header;

new Vue({
  el: '#wrap',
  data: {
    mobile: mobile,
    touch: touch,
    flash: flash,
    swf: false,
    showOverlay: false,
    index: -1,
    indexDirection: 0,
    gallery: gallery,
    platforms: ['HTML5', 'Flash', 'Python']
  },
  methods: {
    wait: function() {
      var pct, swf = document.querySelector('.swf embed')
      if (swf && swf.PercentLoaded) {
        pct = swf.PercentLoaded()
        if (pct === 100) {
          swf.tabIndex = Infinity
          swf.focus()
          return
        }
      }
      setTimeout(this.wait, 100)
    },
    move: function(direction) {
      if (direction < 0)
        this.indexDirection = -1
      else if (direction > 0)
        this.indexDirection = 1
      this.index = this.index + direction
      this.swf = false
    },
    moveTo: function(index) {
      this.move(index - this.index)
    },
    prev: function() {
      this.move(-1)
    },
    next: function() {
      this.move(1)
    },
    close: function() {
      this.index = -1
    }
  },
  computed: {
    scrollable: function() {
      return this.index === -1;
    },
    isAtFirst: function() {
      return this.index === 0
    },
    isAtLast: function() {
      return this.index === this.gallery.length - 1
    },
    current: function() {
      return this.gallery[this.index]
    },
    imageTransition: function() {
      var suffix
      if (this.indexDirection < 0) {
        suffix = '-left'
      } else if (this.indexDirection > 0) {
        suffix = '-right'
      }
      return suffix ? 'slide-image' + suffix : null
    }
  },
  mounted: function() {
    var that = this
    var scrollTick, scrollLast
    wrap = document.querySelector('#wrap')
    hero = document.querySelector('#hero')
    heroImage = hero.querySelector('.image')
    function scroll(event) {
      if (!scrollTick) {
        window.requestAnimationFrame(function() {
          var heroRect = hero.getBoundingClientRect()
          var scrollPos = document.body.scrollTop
          var scrollDiff = scrollPos - scrollLast
          var scrollMax = heroRect.height
          var scrollPct = (scrollPos / scrollMax * 100) * .5
          if (!touch && !mobile)
            heroImage.style.transform = 'translateY(' + scrollPct + '%)'
          scrollTick = false
          scrollLast = scrollPos;
        })
      }
      scrollTick = true
    }
    ['scroll', 'orientationchange', 'touchmove', 'load'].some(function(event) {
      window.addEventListener(event, scroll)
    })
  },
  components: {
    thumb: thumb,
    modal: modal
  }
})
