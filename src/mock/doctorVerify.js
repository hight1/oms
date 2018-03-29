const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config
const Random = Mock.Random
Random.id()


Random.extend({
  hosiptalName: function () {
    let hosiptalName = ['北京医院', '安贞医院', '安定门外医院', '1安贞医院', '2安贞医院']
    return this.pick(hosiptalName)
  },

  rank: function () {
    let rank = ['一甲', '二甲', '三甲']
    return this.pick(rank)
  },
  pic: function () {
    let pic = ['http://img05.tooopen.com/images/20150412/tooopen_sy_118141423291.jpg', 'http://pic.58pic.com/58pic/11/84/23/13A58PIC6ZC.jpg']
    return this.pick(pic)
  },
  pic2: function () {
    let pic = ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', 'http://img.taopic.com/uploads/allimg/130331/240460-13033106243430.jpg']
    return this.pick(pic)
  },
  region: function () {
    let region = ['北京', '上海', '广东']
    return this.pick(region)
  },
  isInsurance: function () {
    let isInsurance = ['是', '否']
    return this.pick(isInsurance)
  },
  sort: function () {
    let sort = ['好医院', '坏医院', 'vip医院']
    return this.pick(sort)
  },
  special: function () {
    let special = ['儿科', '脑科', '妇产科']
    return this.pick(special)
  },
  status: function () {
    let status = ['0', '1', '2', '3']
    return this.pick(status)
  },
  goodatIllness: function () {
    let goodatIllness = ['儿病', '脑病', '妇产病']
    return this.pick(goodatIllness)
  },
})

let doctorVerifyListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      'number|+1': 1,
      nickName: '@cname',
      hosiptalName: '@hosiptalName',
      name: '@cname',
      rank: '@rank',
      sort: '@sort',
      officeName: '@special',
      phone: /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
      email: '@email',
      status: '@status',
      pic: '@pic',
      pic2: '@pic2',
      region: '@region',

      goodatIllness: '@goodatIllness',
      'age|11-99': 1,
      address: '@county(true)',
      'expert|1-5': 1,
      'score|1-5': 1,

      isInsurance: '@isInsurance',
      'isAdmin|0-1': 1,
      verifyTime: () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss')
      },
      submitTime: () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss')
      },
      roles: [
        {
          id: 2,
          name: '普通用户',
        },
      ],
    }],
})


let database = doctorVerifyListData.data

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`GET ${apiPrefix}/doctorVerifys`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = Number(page) || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createdTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      page: page,
      pageSize: pageSize,
      total: newData.length,
    })
  },

  [`DELETE ${apiPrefix}/doctorVerifys`] (req, res) {
    const { ids } = req.body
    database = database.filter((item) => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },


  [`POST ${apiPrefix}/doctorVerifys`] (req, res) {
    const newData = req.body
    newData.createdTime = Mock.mock('@now')
    newData.avatar = newData.avatar
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/doctorVerifys/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/doctorVerifys/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter((item) => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${apiPrefix}/doctorVerifys/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
