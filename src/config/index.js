export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '客户信息通知平台',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev:
      // 'http://172.16.102.67:8080/',
      'https://www.fastmock.site/mock/4fb932314f77c67a4b1544281faa857f/isun',
    // 'http://10.121.54.18:8080/',
    // 'http://cis.crcgas.com/',
    // 'http://mapp.crcgas.com:18001/process/notify/crcgas_cis@fiberhome/',
    // 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    pro:
      // 'http://172.16.102.67:8080/'
      'https://www.fastmock.site/mock/4fb932314f77c67a4b1544281faa857f/isun'
    // 'http://10.121.54.18:8080/'
    // 'http://mapp.crcgas.com:18001/process/notify/crcgas_cis@fiberhome/'
    // 'http://172.16.102.69:8080/cis/'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
