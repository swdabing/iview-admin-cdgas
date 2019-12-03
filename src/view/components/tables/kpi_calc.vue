<template>
  <div>
    <Card>
      <tables ref="tables" search-place="top" :columns='COLUMNS' stripe></tables>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
  components: {
    Tables
  },
  data () {
    return {
      modal1: false,
      user: this.$store.state.user.userName,
      row: {},
      COLUMNS: [
        {
          title: '被考核人',
          key: 'KPI_USER'
        },
        {
          title: '分组',
          key: 'KPI_GROUP'
        },
        {
          title: '小组打分人数',
          key: 'TOTAL',
          render: (h, params) => {
            const row = params.row
            const color =
              row.TOTAL === 0
                ? 'primary'
                : 'success'
            const text = row.TOTAL

            return h(
              'Tag',
              {
                props: {
                  type: 'dot',
                  color: color
                },
                nativeOn: {
                  click: (e) => {
                    this.row = row
                    this.showScorer()
                  }
                }
              },
              text
            )
          }
        },
        {
          title: '小组平均分',
          key: 'AVG'
        },
        {
          title: '权重',
          key: 'WEIGHT'
        },
        {
          title: '互评',
          key: 'SCORE'
        },
        {
          title: '副经理分',
          key: 'HYS'
        },
        {
          title: '经理分',
          key: 'LT'
        },
        {
          title: '总分',
          key: 'TOTAL_SCORE'
        }
      ]
    }
  },
  methods: {
    showScorer () {
      getTableData("select * from kpi where KPI_USER='" + this.row.KPI_USER + "'").then(r => {
        let s = ''
        for (let i = 0; i < r.data.length; i++) {
          s += r.data[i]['SCORER'] + ' ' + r.data[i]['TDXZ'] + ' ' + r.data[i]['GZGFX'] + ' ' + r.data[i]['LDJL'] + '\r\n'
        }
        alert(s.trim())
      })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    init () {
      if (this.$store.state.user.userName === '廖玮' || this.$store.state.user.userName === '陈海燕' || this.$store.state.user.userName === '刘治兵' ||
        this.$store.state.user.userName === '黄远三' || this.$store.state.user.userName === '李涛') {
        // this.$refs.tables.setSql('SELECT KPI_USER,KPI_GROUP,avg(TDXZ) as TDXZ,avg(GZGFX) as GZGFX,avg(LDJL) as LDJL,avg(TDXZ+GZGFX+LDJL) as SCORE,count(case when TDXZ is not null then 1  else null end) as TOTAL from kpi where 1=1', ' group by KPI_USER,KPI_GROUP ORDER BY KPI_GROUP', 'local')
        this.$refs.tables.setSql('WITH SQL1 as (SELECT a.KPI_USER,a.KPI_GROUP,' +
                              'to_char(ROUND(avg(a.TDXZ+a.GZGFX+a.LDJL),2)) as AVG,' +
                              '0.05 as WEIGHT,' +
                              'to_char(ROUND(avg(a.TDXZ+a.GZGFX+a.LDJL)*0.05,2)) as SCORE,' +
                              'to_char(ROUND((SELECT (b.TDXZ+b.GZGFX+b.LDJL)*0.05 from kpi b where b.SCORER=\'黄远三\' and a.KPI_USER=b.KPI_USER),2)) as HYS,' +
                              'to_char(ROUND((SELECT (c.TDXZ+c.GZGFX+c.LDJL)*0.1 from kpi c where c.SCORER=\'李涛\' and a.KPI_USER=c.KPI_USER),2)) as LT,' +
                              'count(case when TDXZ is not null then 1  else null end) as TOTAL ' +
                              'from kpi a where a.SCORER not in (\'李涛\',\'黄远三\') ' +
                              'group by a.KPI_USER,a.KPI_GROUP ORDER BY a.KPI_GROUP) ' +
                              'SELECT SQL1.*,to_char(ROUND(SQL1.SCORE+SQL1.HYS+SQL1.LT,2)) as TOTAL_SCORE FROM SQL1', '', 'local')
        this.$refs.tables.changePage(1)
      } else {
        this.$Message.error('对不起，您没有权限查阅！')
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
