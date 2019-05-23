/*
import { getParams } from '@/libs/util'
const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    user_id: '1',
    access: ['super_admin', 'admin'],
    token: 'super_admin',
    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  },
  admin: {
    name: 'admin',
    user_id: '2',
    access: ['admin'],
    token: 'admin',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  }
}
*/
export const login = req => {
  // req = JSON.parse(req.body)
  // return { token: USER_MAP[req.userName].token }
  return {
    successful: true,
    resultHint: 'success',
    resultValue: { SESSIONID: 'p7GRo6sfv3TqLwQst0w5uY32FvqbpI-VBjvYzAo2T0Q0XHJeWCh2!-1458093467!1557221583647' }
  }
}

export const getUserInfo = req => {
  // const params = getParams(req.url)
  // return USER_MAP[params.token]
  const data = {
    name: 'super_admin',
    user_id: '1',
    access: ['super_admin', 'admin'],
    token: token,
    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  }
  return data
}

export const logout = req => {
  return null
}
