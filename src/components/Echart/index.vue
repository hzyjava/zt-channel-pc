<template>
  <div ref="echartDom"></div>
</template>

<script>
import echarts from 'echarts'
import { addListener, removeListener } from 'resize-detector'
import debounce from 'lodash/debounce'
export default {
  name: 'Echart',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  created() {
    // 防止缩放的时候，频繁触发resize
    this.resize = debounce(this.resize, 300)
  },
  mounted() {
    this.renderEchart()
    addListener(this.$refs.echartDom, this.resize)
  },
  methods: {
    resize() {
      this.chart.resize()
    },
    renderEchart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.echartDom)
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(this.options)
    }
  },
  watch: {
    options(val) {
      this.chart.setOption(val)
    }
  },
  // 销毁组件，防止内存泄漏
  beforeDestroy() {
    removeListener(this.$refs.echartDom, this.resize)
    this.chart.dispose()
    this.chart = ''
  }
}
</script>

<style lang="less" scoped></style>
