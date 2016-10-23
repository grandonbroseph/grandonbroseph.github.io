import modal from './components/modal'
import thumb from './components/thumb'
import gallery from './gallery'

var mobile = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
var touch = 'ontouchstart' in window || navigator.maxTouchPoints

var wrap, hero, heroImage, header;

new Vue({
  el: '#wrap',
  data: {
    mobile: mobile,
    touch: touch,
    showNav: false,
    showOverlay: false,
    showHeader: true,
    colorHeader: false,
    index: -1,
    indexDirection: 0,
    gallery: gallery,
    platforms: ['HTML5', 'Flash', 'Python']
  },
  methods: {
    move: function(direction) {
      if (direction < 0)
        this.indexDirection = -1
      else if (direction > 0)
        this.indexDirection = 1
      this.index = this.index + direction
      this.showHeader = false
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
    heroImage = document.querySelector('#hero-image')
    header = document.querySelector('#header')
    function scroll(event) {
      if (!scrollTick) {
        window.requestAnimationFrame(function() {
          var heroRect = hero.getBoundingClientRect()
          var headerRect = header.getBoundingClientRect()
          var scrollPos = document.body.scrollTop
          var scrollDiff = scrollPos - scrollLast
          var scrollMax = heroRect.height - headerRect.height
          var scrollPct = (scrollPos / scrollMax * 100) * .5
          if (!touch && !mobile)
            heroImage.style.transform = 'translateY(' + scrollPct + '%)'
          that.showHeader = scrollPos <= headerRect.height
          that.colorHeader = scrollPos > scrollMax
          if (that.colorHeader) {
            if (scrollDiff) {
              if (scrollDiff < 0) {
                that.showHeader = true
              } else if (scrollDiff > 0) {
                that.showHeader = false
              }
            }
          }
          if (!that.showHeader)
            that.showNav = false
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
