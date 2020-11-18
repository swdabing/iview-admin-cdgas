import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  /*
  return axios.request({
    url:
      'http://mapp.crcgas.com:18001/process/notify/crcgas_cis@fiberhome/login?data={"USER":"' + userName.toUpperCase() + '","PWD":"' + password + '"}',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  */
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
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
  /*
  const user = JSON.parse(getUser())
  const data = {
    name: user.REAL_NAME, // 'super_admin',
    user_id: user.STAFF_NO, // '1',
    access: user.DUTY, // ['super_admin', 'admin'],
    token: user.SESSIONID, // token,
    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  }
  return data
  */
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = (user) => {
  let sql = "select count(*) as count from SYS_MSG where \"state\"='unread' and \"user\"='" + user + "'"
  return axios.request({
    url: 'db?sql=' + encodeURIComponent(sql) + '&isKeyValue=true',
    method: 'get'
  })
}

export const getMessage = (user) => {
  let sql = "select \"msg_id\",to_char(\"create_time\",'yyyy-mm-dd hh24:mi:ss') as \"create_time\",\"user\",\"title\",\"content\",\"state\" from SYS_MSG where \"user\"='" + user + "'"
  return axios.request({
    url: 'db?sql=' + encodeURIComponent(sql) + '&isKeyValue=true',
    method: 'get'
  }).then(res => {
    let data = res.data
    let unreadList = []
    let readedList = []
    let trashList = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].state === 'unread') {
        unreadList.push(data[i])
      } else if (data[i].state === 'readed') {
        readedList.push(data[i])
      } else if (data[i].state === 'trash') {
        trashList.push(data[i])
      }
    }
    return {
      data: {
        unread: unreadList,
        readed: readedList,
        trash: trashList
      }
    }
  })
}

export const hasRead = msg_id => {
  let sql = "update SYS_MSG set \"state\"='readed' where \"msg_id\"='" + msg_id + "'"
  return axios.request({
    url: 'db?sql=' + encodeURIComponent(sql),
    method: 'get'
  })
}

export const removeReaded = msg_id => {
  let sql = "update SYS_MSG set \"state\"='trash' where \"msg_id\"='" + msg_id + "'"
  return axios.request({
    url: 'db?sql=' + encodeURIComponent(sql),
    method: 'get'
  })
}

export const restoreTrash = msg_id => {
  return hasRead(msg_id)
}
