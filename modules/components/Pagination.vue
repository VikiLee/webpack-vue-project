<template>
  <div class="page_change" v-if="page > 1">
    <a href="javascript:;" class="btn_prev" :class="prevClass" @click="goPrev"><i></i></a>
    <a href="javascript:;" v-for="(key, i) in list" :key="i" :class="getCurClass(key, i)" @click="goIndex(key)">{{key}}</a>
    <a href="javascript:;" class="btn_next" :class="nextClass" @click="goNext"><i></i></a>
  </div>
</template>

<script>
export default {
  name: 'xl-pagination',
  props: {
    page: {
      type: Number,
      default: 0,
      require: true,
      validator (val) {
        return val >= 0
      }
    },
    index: {
      type: Number,
      default: 1,
      require: true
    }
  },
  data () {
    return {
      cur: this.index
    }
  },
  computed: {
    prevClass () {
      return {
        'xl-pag-disable': this.cur < 2
      }
    },
    nextClass () {
      return {
        'xl-pag-disable': this.cur > this.page - 1
      }
    },
    list () {
      if (this.page < 10) {
        let page = this.page
        let list = []
        while (page) {
          list.unshift(page--)
        }
        return list
      } else {
        if (this.cur < 4) {
          return [1, 2, 3, 4, 5, '...', this.page]
        }
        if (this.cur === 4) {
          return [1, 2, 3, 4, 5, 6, '...', this.page]
        }
        if (this.page - this.cur < 4) {
          let list = []
          let page = 6
          while (page) {
            list.push(this.page - --page)
          }
          return [1, '...'].concat(list)
        }
        return [1, '...', this.cur - 2, this.cur - 1, this.cur, this.cur + 1, this.cur + 2, '...', this.page]
      }
    }
  },
  methods: {
    goIndex (key) {
      if (key === '...') return
      this.cur = key
      this.emitParent()
    },
    goPrev () {
      this.cur = this.cur < 2 ? 1 : --this.cur
      this.emitParent()
    },
    goNext () {
      this.cur = this.cur === this.page ? this.page : ++this.cur
      this.emitParent()
    },
    emitParent () {
      this.$emit('change', this.cur)
    },
    getCurClass (key, index) {
      let isKey = key === '...'
      return {
        btn_num: !isKey,
        btn_more: isKey,
        cur: this.cur === key
      }
    }
  }
}
</script>

<style>
.xl-pag-disable {
  pointer-events: none
}
</style>

