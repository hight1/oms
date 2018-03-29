const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config
const Random = Mock.Random


Random.extend({
  hospitalName: function () {
    let hospitalName = ['北京医院', '安贞医院', '安定门外医院', '1安贞医院', '2安贞医院']
    return this.pick(hospitalName)
  },
  rank: function () {
    let rank = ['一甲', '二甲', '三甲']
    return this.pick(rank)
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
})

let hospitalListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      'number|+1': 1,

      name: '@hospitalName',
      rank: '@rank',
      sort: '@sort',
      special: '@special',
      phone: /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,

      region: '@region',

      'status|1-2': 1,
      'age|11-99': 1,
      address: '@county(true)',
      'expert|1-5': 1,
      'score|1-5': 1,

      isInsurance: '@isInsurance',
      'isAdmin|0-1': 1,
      createdTime: () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss')
      },
      updatedTime: () => {
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


let database = hospitalListData.data

const userPermission = {
  DEFAULT: [
    'dashboard',
  ],
  ADMIN: [
    'dashboard', 'hospital', 'roles', 'permissions', 'users',
  ],
  DEVELOPER: ['dashboard', 'hospital', 'roles', 'permissions', 'users'],
}

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  }, {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  }, {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
]

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

  [`POST ${apiPrefix}/hospitals/login`] (req, res) {
    const { username, password } = req.body
    const user = adminUsers.filter((item) => item.username === username)

    if (user.length > 0 && user[0].password === password) {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      })
      res.json({ success: true, message: 'Ok' })
    } else {
      res.status(400).end()
    }
  },

  [`GET ${apiPrefix}/hospitals/logout`] (req, res) {
    res.clearCookie('token')
    res.status(200).end()
  },

  [`GET ${apiPrefix}/hospitals/me`] (req, res) {
    const cookie = req.headers.cookie || ''
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
    const response = {}
    const user = {}
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' })
      return
    }
    const token = JSON.parse(cookies.token)
    if (token) {
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const userItem = adminUsers.filter(_ => _.id === token.id)
      if (userItem.length > 0) {
        user.permissions = userItem[0].permissions
        user.username = userItem[0].username
        user.id = userItem[0].id
      }
    }
    response.user = user
    res.json(response)
  },

  [`GET ${apiPrefix}/hospitals`] (req, res) {
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

  [`DELETE ${apiPrefix}/hospitals`] (req, res) {
    const { ids } = req.body
    database = database.filter((item) => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },


  [`POST ${apiPrefix}/hospitals`] (req, res) {
    const newData = req.body
    newData.createdTime = Mock.mock('@now')
    newData.avatar = newData.avatar
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/hospitals/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/hospitals/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter((item) => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },


  [`PATCH ${apiPrefix}/hospitals/:id`] (req, res) {
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


  [`POST ${apiPrefix}/hospitals/:id/grant`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`POST ${apiPrefix}/hospitals/:id/deny`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
