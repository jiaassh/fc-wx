import service from '../../../gym/config/service'  // 方法引用
// let address = 'http://192.168.0.24:8080'
export default {
  getGymHomeData: function (url, params, callback) {   // 从微信首页进入健身房首页
    service.post(service_url + '/o2o/gym/wx/index', params, callback)
  },
  getGymRoomData: function (url, params, callback) { // 从健身房首页键入健身房模块
  	service.post(service_url + '/o2o/gym/wx/enter', params, callback)
  },
  getStatus: function (url, params, callback) {   // 运动中(监测器材是否关闭)
    service.post(service_url + '/o2o/gym/wx/devicestatus', params, callback)
  },
  goExit: function (url, params, callback) {   // 退出,付款
    service.post(service_url + '/o2o/gym/wx/out', params, callback)
  },
  submitPayInfor: function (url, params, callback) {   // 支付接口,提交支付信息
    service.post(service_url + '/o2o/gym/wx/pay', params, callback)
  },
  openDoor: function (url, params, callback) {   // 支付接口,提交支付信息
    service.post(service_url + '/o2o/gym/wx/opendoor', params, callback)
  },
  isappoint: function (url, params, callback) {   // 是否预约接口
    service.post(service_url + '/o2o/gym/wx/isappoint', params, callback)
  },
  opendevice: function (url, params, callback) {   // 开启设备
    service.post(service_url + '/o2o/gym/wx/opendevice', params, callback)
  },
}
