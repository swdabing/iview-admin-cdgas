<template>
  <div style='margin: 10px;overflow: hidden'>
    <Table :data='tableData1' :columns='tableColumns1' stripe></Table>
    <Page :total='100' :current='1' @on-change='changePage' style='float: right;'></Page>
  </div>
</template>
<script>
// import { getTableData } from '@/api/data'
export default {
  data () {
    return {
      tableData1: this.mockTableData1(),
      tableColumns1: [
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
                }
              },
              text
            )
          }
        }, /* {
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
        }, */
        {
          title: '发送信息',
          key: 'portrayal',
          render: (h, params) => {
            return h(
              'Poptip',
              {
                props: {
                  trigger: 'hover',
                  title: '用户编号：1234567890' + params.row.portrayal.length,
                  placement: 'bottom'
                }
              },
              [
                h('Tag', '1234567890' + params.row.portrayal.length),
                h(
                  'div',
                  {
                    slot: 'content'
                  },
                  [
                    h(
                      'ul',
                      this.tableData1[params.index].portrayal.map(item => {
                        return h(
                          'li',
                          {
                            style: {
                              textAlign: 'center',
                              padding: '4px'
                            }
                          },
                          item
                        )
                      })
                    )
                  ]
                )
              ]
            )
          }
        },
        {
          title: '返回信息',
          key: 'people',
          render: (h, params) => {
            return h(
              'Poptip',
              {
                props: {
                  trigger: 'hover',
                  title: params.row.people.length + 'customers',
                  placement: 'bottom'
                }
              },
              [
                h('Tag', params.row.people.length),
                h(
                  'div',
                  {
                    slot: 'content'
                  },
                  [
                    h(
                      'ul',
                      this.tableData1[params.index].people.map(item => {
                        return h(
                          'li',
                          {
                            style: {
                              textAlign: 'center',
                              padding: '4px'
                            }
                          },
                          '返回状态' + item.n + '：' + item.c + 'People'
                        )
                      })
                    )
                  ]
                )
              ]
            )
          }
        },
        {
          title: '生成时间',
          key: 'time',
          render: (h, params) => {
            return h('div', 'Almost' + params.row.time + 'days')
          }
        },
        {
          title: '提交时间',
          key: 'update',
          render: (h, params) => {
            return h(
              'div',
              this.formatDate(this.tableData1[params.index].update)
            )
          }
        }
      ]
    }
  },
  methods: {
    mockTableData1 () {
      let data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          CONT_CHANL_NO: '138001380' + Math.floor(Math.random() * 100 + 1),
          RET_CODE: Math.floor(Math.random() * 3 + 1),
          RET_MSG: '已生成',
          portrayal: ['用户姓名：张三', '本次读数：1234', '本次气量：56', '应缴气费：78.9', '计算日期：20190415'],
          people: [
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: 'People' + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            }
          ],
          time: Math.floor(Math.random() * 7 + 1),
          update: new Date()
        })
      }
      return data
    },
    formatDate (date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    },
    changePage () {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1()
    }
  }
}
</script>
