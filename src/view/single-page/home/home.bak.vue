<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="短信发送占比"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="本周短信发送量"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'overview',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '当日总数', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '发送成功', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '发送失败', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '未发送', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '档案异常', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '超期发送', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: 1548, name: '气费账单' },
        { value: 335, name: '欠费催缴' },
        { value: 310, name: '业务费欠费' },
        { value: 234, name: '验证码' },
        { value: 135, name: '其他' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
