<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card  :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :simplify="infor.simple" :unit="unit" :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card >
          <chart-pie ref="pie" style="height: 300px;" :value="pieData" text="短信发送占比"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card >
          <chart-bar ref="bar" style="height: 300px;" :value="barData" text="短信发送量"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card >
        <p slot="title">
          <Badge :status="stateBadge" />
          {{stateMsg}}
        </p>
        <example style="display: none; height: 310px;"/>
        <Steps :current="stepCurrent" :status="stepStatus">
          <Step title="同步CIS气费账单" :content="step0"></Step>
          <Step title="写入本地数据库" :content="step1"></Step>
          <Step title="生成短信文件" :content="step2"></Step>
          <Step title="更新本地数据库状态" :content="step3"></Step>
        </Steps>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import { getTableData } from '@/api/data'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      unit: [[3, '千+'], [4, '万+']],
      success: 0,
      fail: 0,
      overdue: 0,
      step0: '',
      step1: '',
      step2: '',
      step3: '',
      stepCurrent: 0,
      stepStatus: 'process',
      stateMsg: '今日短信同步失败',
      stateBadge: 'error',
      inforCardData: [
        { title: '十日气费账单数', icon: 'md-help-circle', count: 0, color: '#9A66E4', simple: true },
        { title: '十日有效短信数', icon: 'md-locate', count: 0, color: '#E46CBB', simple: true },
        { title: '今日新增短信数', icon: 'md-person-add', count: 0, color: '#2d8cf0', simple: true },
        { title: '今日提交成功数', icon: 'md-chatbubbles', count: 0, color: '#19be6b', simple: true },
        { title: '今日提交失败数', icon: 'md-share', count: 0, color: '#ed3f14', simple: true },
        { title: '今日超期提交数', icon: 'md-map', count: 0, color: '#ff9900', simple: true }
      ],
      pieData: [
        /*
        { value: 0, name: '成功' },
        { value: 0, name: '失败' },
        { value: 0, name: '超期' }
        */
      ],
      barData: {
        /*
        周一: 13253,
        周二: 34235,
        周三: 26321,
        周四: 12340,
        周五: 24643,
        周六: 1322,
        周日: 1324
        */
      }
    }
  },
  methods: {
    formatDate (date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '' + m + '' + d
    },
    formatTime (date) {
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return h + ':' + m + ':' + s
    },
    timeDiff (date) {
      var diff = ''
      var days = Math.floor(date / (24 * 3600 * 1000))
      var leave1 = date % (24 * 3600 * 1000)
      var hours = Math.floor(leave1 / (3600 * 1000))
      var leave2 = leave1 % (3600 * 1000)
      var minutes = Math.floor(leave2 / (60 * 1000))
      var leave3 = leave2 % (60 * 1000)
      var seconds = Math.round(leave3 / 1000)
      if (days !== 0) {
        diff += days + '天'
      }
      if (hours !== 0) {
        diff += hours + '时'
      }
      if (minutes !== 0) {
        diff += minutes + '分'
      }
      if (seconds !== 0) {
        diff += seconds + '秒'
      }
      return diff
    },
    init (table_name) {
      let date = this.formatDate(new Date()) // 格式化日期
      let successCode = '000000'
      let createCode = 'FFFFFF'
      getTableData("select * from SYS_PERFORMANCE where TABLE_NAME='" + table_name +
      "' and substr(YMD,0,6)='" + date.slice(0, -2) + "'" + // 本月短信
      // "' and " + date + '-YMD<' + new Date().getDay() + // 本周短信
      ' order by YMD', 1, 500).then(res => {
        let len = res.data.length
        if (len > 0) {
          this.inforCardData[0].count = res.data[len - 1].TOTAL_ROWS
          this.inforCardData[1].count = res.data[len - 1].EFFECTIVE_ROWS
          this.inforCardData[2].count = res.data[len - 1].CREATE_ROWS
          // 短信发送量
          this.barData = {}
          res.data.forEach(element => {
            let ymd = element.YMD
            this.barData[ymd] = element.CREATE_ROWS
          })
          this.$refs.bar.init(this.barData)
          // 今日短信同步状态
          let step = res.data[len - 1]
          // 不是今天
          if (date !== this.formatDate(new Date(Date.parse(step.BEGIN_SELECT)))) {
            this.stepCurrent = 0
            this.stepStatus = 'error'
          }
          // 查询cis短信
          if (step.BEGIN_SELECT != null && step.END_SELECT != null) {
            this.stepCurrent = 1
            this.step0 = this.formatTime(new Date(Date.parse(step.BEGIN_SELECT))) + '到' + this.formatTime(new Date(Date.parse(step.END_SELECT))) + ' (' + this.timeDiff(new Date(Date.parse(step.END_SELECT)) - new Date(Date.parse(step.BEGIN_SELECT))) + ')'
            // 写入本地临时表
            if (step.BEGIN_INSERT != null && step.END_INSERT != null) {
              this.stepCurrent = 2
              this.step1 = this.formatTime(new Date(Date.parse(step.BEGIN_INSERT))) + '到' + this.formatTime(new Date(Date.parse(step.END_INSERT))) + ' (' + this.timeDiff(new Date(Date.parse(step.END_INSERT)) - new Date(Date.parse(step.BEGIN_INSERT))) + ')'
              // 从历史表更新临时表状态并生成短信文件
              if (step.BEGIN_H2DTL != null && step.END_H2DTL != null) {
                this.stepCurrent = 3
                this.step2 = this.formatTime(new Date(Date.parse(step.BEGIN_H2DTL))) + '到' + this.formatTime(new Date(Date.parse(step.END_H2DTL))) + ' (' + this.timeDiff(new Date(Date.parse(step.END_H2DTL)) - new Date(Date.parse(step.BEGIN_H2DTL))) + ')'
                // 从临时表迁移到历史表或改状态
                if (step.BEGIN_DTL2H != null && step.END_DTL2H != null) {
                  this.stepCurrent = 3
                  this.step3 = this.formatTime(new Date(Date.parse(step.BEGIN_DTL2H))) + '到' + this.formatTime(new Date(Date.parse(step.END_DTL2H))) + ' (' + this.timeDiff(new Date(Date.parse(step.END_DTL2H)) - new Date(Date.parse(step.BEGIN_DTL2H))) + ')'
                  this.stepStatus = 'finish'
                  this.stateMsg = '今日【' + step.TABLE_DESC + '】短信同步成功' + '，用时' + this.timeDiff(new Date(Date.parse(step.END_DTL2H)) - new Date(Date.parse(step.BEGIN_SELECT)))
                  this.stateBadge = 'success'
                } else {
                  this.stepCurrent = 3
                  this.stepStatus = 'error'
                }
              } else {
                this.stepCurrent = 2
                this.stepStatus = 'error'
              }
            } else {
              this.stepCurrent = 1
              this.stepStatus = 'error'
            }
          } else {
            this.stepCurrent = 0
            this.stepStatus = 'error'
          }
        }
      })
      getTableData("select sum(case when RET_CODE='" + successCode + "' then 1 else 0 end) as SUCCESS," +
      " sum(case when RET_CODE<>'" + successCode + "' and RET_CODE<>'" + createCode + "' then 1 else 0 end ) as FAIL," +
      " sum(case when substr(MSG_ID,0,8)-CALC_DATE > 5 and RET_CODE<>'" + createCode + "' then 1 else 0 end) as OVERDUE" +
      ' from ' + table_name + '_H where substr(MSG_ID,0,8)=' + date).then(res => {
        this.success = res.data[0].SUCCESS ? res.data[0].SUCCESS : 0
        this.fail = res.data[0].FAIL ? res.data[0].FAIL : 0
        this.overdue = res.data[0].OVERDUE ? res.data[0].OVERDUE : 0
        this.inforCardData[3].count = this.success
        this.inforCardData[4].count = this.fail
        this.inforCardData[5].count = this.overdue
        // 短信发送占比
        this.pieData = [
          { value: this.success, name: '成功' },
          { value: this.fail, name: '失败' },
          { value: this.overdue, name: '超期' }
        ]
        this.$refs.pie.init(this.pieData)
      })
    }
  },
  mounted () {
    this.init('RQ_RCVBL_DTL')
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
