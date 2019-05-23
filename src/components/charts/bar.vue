<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBar',
  props: {
    // value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null,
      value: {}
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    init (barData) {
      let xAxisData = Object.keys(barData)
      let seriesData = Object.values(barData)
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/> 数量 : {c}'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'bar',
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = [
                  '#2d8cf0', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                  '#C1232B',
                  '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                  '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                ]
                // return colorList[params.dataIndex]
                return colorList[0]
              },
              label: {
                show: true,
                position: 'top',
                formatter: '{c}'
              }
            }
          }
        }]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
