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
      default: () => ({})
    }
  },
  data () {
    return {
      visible: false
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
      window.scrollTo(0, 0)
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
