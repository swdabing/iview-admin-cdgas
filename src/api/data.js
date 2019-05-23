import axios from '@/libs/api.request'

/**
 * 查询总数
 */
export const getTotal = (sql) => {
  let sqlTotal = 'select count(1) as TOTAL from (' + sql + ')'
  return axios.request({
    url: 'db?sql=' + encodeURIComponent(sqlTotal) + '&isKeyValue=true',
    method: 'get'
  })
}

/**
 * 查询分页结果
 */
export const getTableData = (sql, page, pageSize) => {
  if (page == null) {
    page = 1
  }
  if (pageSize == null) {
    pageSize = 10
  }
  let sqlByPage = 'select * from (select a1.*,rownum rn from (' + sql + ') a1 where rownum <=' + (page * pageSize) + ') where rn>=' + ((page - 1) * pageSize + 1)
  return axios.request({
    url: 'db?sql=' + encodeURIComponent(sqlByPage) + '&isKeyValue=true',
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

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
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
