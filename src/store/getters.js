const getters = {
  userInfo: state => state.user.userInfo,
  selectItem: state => state.user.selectItem,
  brandId: state => state.user.brandId,
  appName: state => state.user.appName,
  agentInfo: state => state.user.agentInfo,
  token: state => state.user.token,
  LzfUserName: state => state.user.LzfUserName,
}
export default getters
