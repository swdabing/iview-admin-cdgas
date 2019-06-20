<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartPie',
  props: {
    // value: Array,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null,
      value: []
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    init (pieData) {
      // this.value = pieData
      // let legend = this.value.map(_ => _.name)
      let legend = pieData.map(_ => _.name)
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/> 数量：{c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legend
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            selectedMode: 'single',
            data: pieData, // this.value,
            label: {
              normal: {
                formatter: '{b}: {c}',
                position: 'top'
              }
            },
            itemStyle: {
              color: function (params) {
                var colorList = [
                  '#19be6b', '#ed3f14', '#ff9900',
                  '#2d8cf0', '#B5C334', '#FCCE10',
                  '#E87C25', '#27727B', '#C1232B',
                  '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                  '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                ]
                return colorList[params.dataIndex]
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
