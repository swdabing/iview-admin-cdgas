<template>
  <div>
    <Card>
      <Input style="width:200px;padding-right:10px" :disabled="disabled" clearable placeholder="请输入您的姓名" class="search-input" v-model="user" />
      <Button style="margin: 10px 0;" type="primary" @click="init">开始打分</Button>
      <tables ref="tables" search-place="top" :columns='COLUMNS' stripe></tables>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Button style="margin: 10px 10px;" type="primary" @click="modal2=true">清空打分</Button>
    </Card>

    <Modal v-model="modal1"
        title="请打分"
        @on-ok="ok"
        @on-cancel="cancel">
        <p style="font-size:18px;font-weight:bold">
          团队协作（40分）
        </p>
        <p>以公司利益为重，积极为其它团队和团队内他人提供支持和帮助。
          <Input v-model="row.TDXZ"/>
        </p><br/>
        <p style="font-size:18px;font-weight:bold">
          工作规范性（40分）
        </p>
        <p>按照工作要求，准确及时进行工作记录和完成工作报告。
          <Input v-model="row.GZGFX"/>
        </p><br/>
        <p style="font-size:18px;font-weight:bold">
          劳动纪律（20分）
        </p>
        <p>按照公司工作时间要求，严格劳动纪律。
          <Input v-model="row.LDJL"/>
        </p>
    </Modal>
    <Modal v-model="modal2"
        title="清空确认"
        @on-ok="clear"
        @on-cancel="cancel">
        <p>是否清空所有打分记录？</p>
    </Modal>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { execute } from '@/api/data'
export default {
  components: {
    Tables
  },
  data () {
    return {
      modal1: false,
      modal2: false,
      user: this.$store.state.user.userName,
      disabled: this.$store.state.user.userName !== '廖玮',
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
          title: '团队协作',
          key: 'TDXZ'
        },
        {
          title: '工作规范性',
          key: 'GZGFX'
        },
        {
          title: '劳动纪律',
          key: 'LDJL'
        },
        {
          title: '总分',
          key: 'SCORE',
          render: (h, params) => {
            const row = params.row
            const color =
              row.TDXZ === null
                ? 'primary'
                : 'success'
            const text = row.SCORE === null ? '未打分' : row.SCORE

            return h(
              'Tag',
              {
                props: {
                  type: 'dot',
                  color: color
                },
                nativeOn: {
                  click: (e) => {
                    this.modal1 = true
                    this.row = row
                  }
                }
              },
              text
            )
          }
        }
      ]
    }
  },
  methods: {
    ok () {
      if (!this.row.TDXZ || !this.row.GZGFX || !this.row.LDJL) {
        this.$Message.warning('未正确提交，请检查录入项目！')
        return
      }
      let data = ''
      let sql = 'update KPI set TDXZ=' + this.row.TDXZ + ',GZGFX=' + this.row.GZGFX + ',LDJL=' + this.row.LDJL + ' where KPI_ID=' + this.row.KPI_ID
      execute(sql).then(res => {
        data = res.data
        if (data.rowsAffected === 1) {
          this.$Message.success('更新成功')
        } else {
          this.$Message.error('更新失败')
        }
        this.init()
      })
    },
    cancel () {
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    clear () {
      let sql = "update KPI set TDXZ=null,GZGFX=null,LDJL=null where SCORER='" + this.user + "'"
      execute(sql).then(e => {
        this.init()
      })
    },
    init () {
      this.$refs.tables.setSql("SELECT KPI_ID,KPI_USER,KPI_GROUP,TDXZ,GZGFX,LDJL,TDXZ+GZGFX+LDJL as SCORE,SCORER from KPI where SCORER='" + this.user + "'", ' order by SCORER', 'local')
      this.$refs.tables.changePage(1)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
