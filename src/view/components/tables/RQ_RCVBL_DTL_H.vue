<template>
  <div>
    <Card>
      <tables ref="tables" searchable search-place="top" :columns='COLUMNS' stripe></tables>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>

    <Modal v-model="modal1"
        title="手动发送短信"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>{{MSG}}</p>
    </Modal>
  </div>
</template>
<script>
import Tables from '_c/tables'
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
          title: '手机号',
          key: 'CONT_CHANL_NO'
        },
        {
          title: '状态',
          key: 'RET_CODE',
          render: (h, params) => {
            const row = params.row
            const color =
              row.RET_CODE === 'FFFFFF'
                ? 'primary'
                : row.RET_CODE === '000000'
                  ? 'success'
                  : 'error'
            const text = row.RET_MSG

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
                    this.MSG = '是否发送气费账单短信到' + row.CONT_CHANL_NO + '？'
                  }
                }
              },
              text
            )
          }
        }, {
          title: '用户编号',
          key: 'CONS_NO'
        }, {
          title: '用户姓名',
          key: 'CONS_NAME'
        }, {
          title: '本次读数',
          key: 'THIS_READ'
        }, {
          title: '本次气量',
          key: 'T_GQ'
        }, {
          title: '应收气费',
          key: 'RCVBL_AMT'
        }, {
          title: '发行日期',
          key: 'CALC_DATE'
        }
      ]
    }
  },
  methods: {
    ok () {
      this.$Message.info(this.row.CONT_CHANL_NO + '手动发送功能未实现')
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
    this.$refs.tables.setSql('select CONT_CHANL_NO,RCVBL_GAS_ID,CONS_NO,CONS_NAME,RCVBL_YM,T_GQ,to_char(RCVBL_AMT) as RCVBL_AMT,THIS_READ,CALC_DATE,RET_CODE,RET_MSG,MSG_ID from RQ_RCVBL_DTL_H where 1=1',
      ' order by RCVBL_GAS_ID desc')
  }
}
</script>
