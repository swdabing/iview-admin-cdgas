import axios from '@/libs/api.request'

/**
 * 查询总数
 */
export const getTotal = (sql, db) => {
  let sqlTotal = 'select count(1) as TOTAL from (' + sql + ')'
  return axios.request({
    url: 'db?sql=' + encodeURIComponent(sqlTotal) + '&isKeyValue=true' + ((db != null && db !== '') ? '&db=' + db : ''),
    method: 'get'
  })
}

/**
 * 查询分页结果
 */
export const getTableData = (sql, page, pageSize, db) => {
  if (page == null) {
    page = 1
  }
  if (pageSize == null) {
    pageSize = 10
  }
  let sqlByPage = 'select * from (select a1.*,rownum rn from (' + sql + ') a1 where rownum <=' + (page * pageSize) + ') where rn>=' + ((page - 1) * pageSize + 1)
  return axios.request({
    url: 'db?sql=' + encodeURIComponent(sqlByPage) + '&isKeyValue=true' + ((db != null && db !== '') ? '&db=' + db : ''),
    method: 'get'
  })
}

/**
 * 执行操作
 */
export const execute = (sql) => {
  return axios.request({
    url: 'db?sql=' + encodeURIComponent(sql),
    method: 'get'
  })
}

/**
 * 保存报错
 */
export const saveErrorLogger = info => {
  return axios.request({
    url: 'db?sql=' + encodeURIComponent('insert into ERR_LOG values(\'' + info.type + '\',\'' + info.code + '\',\'' + info.mes + '\',\'' + info.url + '\',sysdate)').replace(/%/g, '%25'),
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
