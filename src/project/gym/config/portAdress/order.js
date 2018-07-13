import service from '../../../gym/config/service'  // 方法引用
// let address = 'http://192.168.0.24:8080'
export default {
  orderSave: function (url, params, callback) {   // 预约保存接口
    service.post(service_url + '/o2o/gym/wx/orderinfo', params, callback)
  },
  submitOrder: function (url, params, callback) {   // 预约保存接口
    service.post(service_url + '/o2o/gym/wx/order', params, callback)
  }
}
