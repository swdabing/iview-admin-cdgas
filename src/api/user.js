import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  return axios.request({
    url: 'login?env=CIS7021SESSION&user=' + userName.toUpperCase() + '&pwd=' + password,
    // 'http://mapp.crcgas.com:18001/process/notify/crcgas_cis@fiberhome/login?data={"USER":"' + userName.toUpperCase() + '","PWD":"' + password + '"}',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }// ,
    // data: 'url=http://cis.crcgas.com/cis/lsRest/restful/restAuth?data=' + JSON.stringify(data),
    // method: 'post'
    // url: 'lsRest/restful/restAuth',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // data: 'data=' + JSON.stringify(data),
    // method: 'post'
  })
}

export const getUserInfo = (token) => {
  // return axios.request({
  //   url: 'restSysInit',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   data: 'sys=cis',
  //   params: {
  //     token
  //   },
  //   method: 'get'
  // })
  const data = {
    name: 'super_admin',
    user_id: '1',
    access: ['super_admin', 'admin'],
    token: token,
    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  }
  return data
}

export const logout = (token) => {
  // return axios.request({
  //   url: 'logout',
  //   method: 'post'
  // })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    // url: 'https://www.baidu.com/',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
