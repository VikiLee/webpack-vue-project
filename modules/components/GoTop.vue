<template>
  <div class="xl-back-to-top" @click="scrollToTop" v-show="visible">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    },
    options: {
      type: Object,
      default: () => ({
        duration: 1000,
        offset: 0,
        callback: () => {},
        easing: 'easeInOutQuad',
        a11y: false
      })
    }
  },
  data () {
    return {
      visible: false,
      timeStart: null,
      locationStart: null,
      locationEnd: null,
      distance: null,
      duration: 1000
    }
  },
  mounted () {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.visible = this.getScroll(window, true) > this.visibilityHeight
    },
    scrollToTop () {
      this.jump(document.body, this.options)
    },
    getScroll (w, top) {
      let ret = w[`page${top ? 'Y' : 'X'}Offset`]
      const method = `scroll${top ? 'Top' : 'Left'}`
      if (typeof ret !== 'number') {
        const d = w.document
        // ie6,7,8 standard mode
        ret = d.documentElement[method]
        if (typeof ret !== 'number') {
          // quirks mode
          ret = d.body[method]
        }
      }
      return ret
    },
    jump (target) {
      this.locationStart = this.location()
      this.locationEnd = this.top(target)
      let distance = this.locationEnd - this.locationStart
      window.requestAnimationFrame(this.loop)
    },
    location () {
      return window.scrollY || window.pageYOffset;
    },
    top(element) {
      return element.getBoundingClientRect().top + start;
    },
    loop(timeCurrent) {
      if (!this.timeStart) {
        this.timeStart = timeCurrent
      }
      let timeElapsed = timeCurrent - this.timeStart
      let next = this.easing(timeElapsed, this.locationStart, this.distance, this.duration)
      window.scrollTo(0, next)
      timeElapsed < this.duration ? window.requestAnimationFrame(this.loop) : this.done()
    },
    done() {
      window.scrollTo(0, this.locationStart + this.distance)
      this.timeStart = false;
    },
    easing (t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      t = -c / 2 * (t * (t - 2) - 1) + b
      return t
    }
  }
}
</script>

<style>
.xl-back-to-top {
  z-index: 10;
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
}
</style>
