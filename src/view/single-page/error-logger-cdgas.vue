<template>
  <div>
    <tables ref="tables" searchable search-place="top" :columns='COLUMNS' stripe></tables>
    <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    <Button style="margin: 10px 10px;" type="primary" @click="clear">清空错误日志</Button>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { execute } from '@/api/data'
import dayjs from 'dayjs'
export default {
  components: {
    Tables
  },
  name: 'error_logger_page',
  data () {
    return {
      COLUMNS: [
        {
          key: 'TYPE',
          title: '类型',
          width: 100,
          render: (h, { row }) => {
            return (
              <div>
                <icon size={16} type={row.TYPE === 'ajax' ? 'md-link' : 'md-code-working'}></icon>
              </div>
            )
          }
        },
        {
          key: 'CODE',
          title: '编码',
          render: (h, { row }) => {
            return (
              <span>{ row.CODE === '0' ? '-' : row.CODE }</span>
            )
          }
        },
        {
          key: 'MES',
          title: '信息'
        },
        {
          key: 'URL',
          title: 'URL'
        },
        {
          key: 'TIMESTAMP',
          title: '时间',
          render: (h, { row }) => {
            return (
              <span>{ dayjs(row.TIMESTAMP).format('YYYY-MM-DD HH:mm:ss') }</span>
            )
          },
          sortable: true,
          sortType: 'desc'
        }
      ]
    }
  },
  methods: {
    exportExcel () {
      this.$refs.table.exportCsv({
        filename: '错误日志.csv'
      })
    },
    clear () {
      this.$Modal.confirm({
        title: '清空确认',
        content: '<p>所有错误日志将被清空！</p><p>是否继续？</p>',
        onOk: () => {
          execute('delete from ERR_LOG').then(d => {
            this.$refs.tables.changePage(1)
          })
        },
        onCancel: () => {
          this.$Message.info('取消')
        }
      })
    },
    init () {
      this.$refs.tables.setSql('select * from ERR_LOG where 1=1',
        ' order by TIMESTAMP desc')
    }
  },
  activated () {
    this.init()
  },
  mounted () {
    this.init()
  }
}
</script>
<style>
</style>
