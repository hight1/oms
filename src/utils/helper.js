

// Replace Status text
export function getUserStatus (status) {
  if (status === true) {
    return { status: 'success', text: '正常' }
  } else {
    return { status: 'default', text: '禁用' }
  }
}

export function getIsAdminStatus (status) {
  if (status === true) {
    return { status: 'success', text: '是' }
  } else {
    return { status: 'default', text: '否' }
  }
}
export function getGender (status) {
  if (status === 0 || status === '0') {
    return '男'
  } else {
    return '女'
  }
}

export function getWithdrawBillsStatus (status) {
  // 提现状态 0 处理中 1 已处理 2 处理失败
  if (status === 0 || status === '0') {
    return { status: 'default', text: '处理中' }
  } else if (status === 1 || status === '1') {
    return { status: 'success', text: '已处理' }
  } else {
    return { status: 'error', text: '处理失败' }
  }
}
export function getWithdrawBillStatus (status) {
  // 提现状态 0 处理中 1 已处理 2 处理失败
  if (status === 0 || status === '0') {
    return '处理中'
  } else if (status === 1 || status === '1') {
    return '已处理'
  } else {
    return '处理失败'
  }
}
export function getRemoteConsultStatus (status) {
  // 1 等待中 2 会诊中 3 已结束
  if (status === 1 || status === '1') {
    return { status: 'default', text: '专家已接诊' }
  } else if (status === 2 || status === '2') {
    return { status: 'success', text: '会诊已开始' }
  } else if (status === 3 || status === '3') {
    return { status: 'error', text: '会诊已完成' }
  } else {
    return { status: 'default', text: '订单已取消' }
  }
}
export function getHospitalStatus (status) {
  // 未审核-0 审核中-1 审核成功-2 审核失败-3
  if (status === 0 || status === '0') {
    return { status: 'default', text: '未审核' }
  } else if (status === 1 || status === '1') {
    return { status: 'default', text: '审核中' }
  } else if (status === 2 || status === '2') {
    return { status: 'success', text: '审核成功' }
  } else {
    return { status: 'error', text: '审核失败' }
  }
}
export function getDoctorStatus (status) {
  // 未认证-0 认证中-1 认证成功-2 认证失败-3 未上传头像-4 未上传医师执业证书-5
  if (status === 0 || status === '0') {
    return '未认证'
  } else if (status === 1 || status === '1') {
    return '认证中'
  } else if (status === 2 || status === '2') {
    return '认证成功'
  } else if (status === 3 || status === '3') {
    return '认证失败'
  } else if (status === 4 || status === '4') {
    return '未上传头像'
  } else {
    return ' 未上传医师执业证书'
  }
}
export function getStatus (status) {
  // 未审核-0 审核中-1 审核成功-2 审核失败-3
  if (status === 0 || status === '0') {
    return '未审核'
  } else if (status === 1 || status === '1') {
    return '审核中'
  } else if (status === 2 || status === '2') {
    return '审核成功'
  } else {
    return '审核失败'
  }
}
export function getVideoOrdersStatus (status) {
  // 订单状态
  // 10 待付款
  // 11 待付款（倒计时）
  // 20 已取消（患者未付取消）
  // 21 已取消（超时未付）
  // 22 已取消（患者超时未接）
  // 23 已取消（进入视频失败）
  // 24 已取消（患者取消有退款）
  // 25 已取消（患者拒接有退款）
  // 26 已取消（医生取消）
  // 30 已付款（预约成功）
  // 40 已付款（进入服务队列）
  // 41 已付款（发起视频邀请）
  // 42 已付款（患者接听）
  // 43 已付款（进入视频，开始计费）
  // 50 已完成（无退款）
  // 51 已完成（有退款）
  if (status === '10') {
    return '待付款'
  } else if (status === '11') {
    return '待付款（倒计时）'
  } else if (status === '20') {
    return '已取消（患者未付取消）'
  } else if (status === '21') {
    return '已取消（超时未付）'
  } else if (status === '22') {
    return '已取消（患者超时未接）'
  } else if (status === '23') {
    return ' 已取消（进入视频失败）'
  } else if (status === '24') {
    return '已取消（患者取消有退款）'
  } else if (status === '25') {
    return '已取消（患者拒接有退款））'
  } else if (status === '26') {
    return '已取消（医生取消）'
  } else if (status === '30') {
    return '已付款（预约成功）'
  } else if (status === '40') {
    return '已付款（进入服务队列）'
  } else if (status === '41') {
    return '已付款（发起视频邀请）'
  } else if (status === '42') {
    return '已付款（患者接听）'
  } else if (status === '43') {
    return '已付款（进入视频，开始计费）'
  } else if (status === '50') {
    return '已完成（无退款）'
  } else if (status === '51') {
    return '已完成（有退款）'
  } else {
    return '无状态'
  }
}

export function getOpenStatus (status) {
  if (status === 1 || status === '1') {
    return '已开通'
  } else {
    return '未开通'
  }
}

export function isOpenStatus (status) {
  if (status === true || status === 1 || status === '1') {
    return '已打开'
  } else {
    return '已关闭'
  }
}

export function format (a) {
// shijianchuo是整数，否则要parseInt转换
  if (isNull(a)) {
    a = 0
  }
  let timeStamp = parseInt(a, 0)
  function add0 (m) { return m < 10 ? `0${m}` : m }
  let time = new Date(timeStamp)
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  let h = time.getHours()
  let mm = time.getMinutes()
  let s = time.getSeconds()
  return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}:${add0(s)}`
}

// /// 判断支付状态
export function getPayStatus (status) {
  if (status === '00') {
    return { status: 'default', text: '待付款' }
  } else if (status === '10') {
    return { status: 'default', text: '确认中' }
  } else if (status === '30') {
    return { status: 'success', text: '付款成功' }
  } else {
    return { status: 'error', text: '付款失败' }
  }
}
// /////// 判断问题状态

export function getQueStatus (status) {
  if (status === '0') {
    return { status: 'error', text: '未回复' }
  } else if (status === '1') {
    return { status: 'success', text: '已回复' }
  } else if (status === '2') {
    return { status: 'default', text: '已解决' }
  } else {
    return { status: 'error', text: '无法识别状态' }
  }
}

function isNull (p, ignoreString) {
  ignoreString = ignoreString || false
  let result = false
  if (p == null) {
    result = true
  } else if (!ignoreString && (p === 'undefined' || p === 'null')) {
    result = true
  }
  return result
}
export function checkRepeat (tmp) {
  let result = []
  let hash_ = {}

  for (let i = 0; i < tmp.length; i++) {
    let elem_ = tmp[i].code
    if (!hash_[elem_]) {
      result.push(tmp[i])
      hash_[elem_] = true
    }
  }
  return result
}

export function findKey (name, city) {
  let areaCode = []
  let b = city.find((x) => {
    return x.label === name[0]
  })
  b.value ? areaCode.push(b.value) : areaCode.push('')
  if (b.children && name.length >= 2) {
    let c = b.children.find((x) => {
      return x.label === name[1]
    })
    c.value ? areaCode.push(c.value) : areaCode.push('')
    if (c.children && name.length === 3) {
      let d = c.children.find((x) => {
        return x.label === name[2]
      })
      d.value ? areaCode.push(d.value) : areaCode.push('')
    }
  }
  return areaCode
}
export function formatMsg (message, parametersArray) {
  let matchesArray = message.match(/\{(name|mobile|support)\}/g)
  if (matchesArray === null) {
    return false
  }
  let name = matchesArray.find((elem) => {
    return elem === '{name}'
  })
  let mobile = matchesArray.find((elem) => {
    return elem === '{mobile}'
  })
  let support = matchesArray.find((elem) => {
    return elem === '{support}'
  })
  let replacedMsg = message
  replacedMsg = replacedMsg.replace(name, parametersArray[0])
  replacedMsg = replacedMsg.replace(mobile, parametersArray[1])
  replacedMsg = replacedMsg.replace(support, parametersArray[2])
  // for (let i = 0; i < matchesArray.length; i++) {
  //   replacedMsg = replacedMsg.replace(matchesArray[i], parametersArray[i])
  // }
  return replacedMsg
}

// //////////// 判断serveType ///////
export function getServeType (val) {
  if (val === '00') {
    return '视频预约'
  } else if (val === '01') {
    return '视频急救'
  } else if (val === '02') {
    return '义诊'
  } else if (val === '03') {
    return '固定会诊'
  } else if (val === '04') {
    return '私人医生'
  }
}
export function rotate (img) {
  let canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  console.log(img)
  let ctx = canvas.getContext('2d')

  // let x = canvas.width / 2
  // let y = canvas.height / 2
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
 // ctx.translate(x, y)

  ctx.rotate(90 * Math.PI / 180, 200, 200)
  ctx.drawImage(img, 0, -img.height, img.width, -img.height)
  // let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  let dataURL = canvas.toDataURL('image/png')
  return dataURL
}

// //////////// 患者 认证种类 /////////////////////
export function getType (type) {
  if (type === 0) {
    return '二要素认证'
  } else if (type === 1) {
    return '银行卡认证'
  } else if (type === 2) {
    return '身份图片认证'
  } else if (type === 3) {
    return '医师认证'
  } else {
    return '未知类型'
  }
}
// //////////// 患者 认证状态 /////////////////////
export function getPatStatus (type) {
  if (type === '0') {
    return '未认证'
  } else if (type === '1') {
    return '认证中'
  } else if (type === '2') {
    return '已认证'
  } else {
    return '未知状态'
  }
}
