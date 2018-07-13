import axios from 'axios'
import config from '../../gym/config/base' // 参数定义
export default {
  post: function (url, params, callback) {
    // var instance = axios.create(config.serviceConfig)
    axios.post(url, params, config.serviceConfig).then(callback).catch(function (data) {
      alert('请求失败，请检查' + data)
    }
    )
  },
  postFile: function (url, params, callback) {
    axios.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(callback).catch(function (data) {
      alert('请求失败，请检查' + data)
    }
    )
  }
}
