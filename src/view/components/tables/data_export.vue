<template>
  <div>
    <Card>
      <tables ref="tables" searchable search-place="top" :columns='COLUMNS' stripe></tables>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>

    <Modal v-model="modal1"
        title="从CIS数据库导出到Excel"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>{{MSG}}</p>
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
      MSG: '',
      row: {},
      COLUMNS: [
        {
          title: '序号',
          key: 'TIMESTAMP'
        },
        {
          title: '导出类型',
          key: 'SQL_NAME'
        },
        {
          title: '状态',
          key: 'SQL_STAT',
          render: (h, params) => {
            const row = params.row
            const color = 'primary'
            const text = '导出'

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
                    this.MSG = '是否导出数据【' + row.SQL_NAME + '】？'
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
      let host = 'http://172.16.126.25:8080/'
      let url = host + 'export?type=file&fileName=' + this.row.SQL_NAME + '&sql=' + encodeURIComponent(this.row.SQL_VALUE)
      window.open(url)

      let sql = 'insert into SYS_MSG values(' +
        new Date().getTime() + ",sysdate,'" +
        this.$store.state.user.access[0].NAME + "','导出【" +
        this.row.SQL_NAME + "】','" +
        decodeURIComponent(this.row.SQL_VALUE).replace(/'/g, "''") + "','readed')"
      execute(sql)
    },
    cancel () {
      // this.$Message.info('Clicked cancel')
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    this.$refs.tables.setSql('select * from MID_SQLS where 1=1',
      ' order by cast(TIMESTAMP AS int)')
  }
}
</script>
