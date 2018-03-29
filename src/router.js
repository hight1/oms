import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'
// import updateHospital from './routes/hospital/update'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'users',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/users'))
              cb(null, require('./routes/users/'))
            }, 'user')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'roles',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/roles'))
              cb(null, require('./routes/roles/'))
            }, 'role')
          },
        }, {
          path: 'permissions',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/permissions'))
              cb(null, require('./routes/permissions/'))
            }, 'permission')
          },
        }, {
          path: 'request',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/request/'))
            }, 'request')
          },
        },
        {
          path: 'hospitals',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/hospital/'))
            }, 'hospital')
          },
          // childRoutes: [
          //   { path: '/update', component: updateHospital },
          //   { path: '/update',
          //     getComponent (nextState, cb) {
          //       require.ensure([], (require) => {
          //         registerModel(app, require('./models/updateHospital'))
          //         cb(null, require('./routes/hospital/update'))
          //       }, 'updateHospital')
          //     },
          //   },
          // ],
        },
        {
          path: 'hospitals/update/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/updateHospital'))
              cb(null, require('./routes/hospital/update'))
            })
          },
        },
        {
          path: 'hospitals/verify',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/hospital/verify'))
            }, 'verify')
          },
        },
        {
          path: 'patients',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/patient'))
              cb(null, require('./routes/patient/'))
            }, 'patient')
          },
        },
        {
          path: 'patients/edit/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/patient'))
              cb(null, require('./routes/patient/edit'))
            }, 'patient')
          },
        },
        {
          path: 'doctors',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/fakeDoctor'))
              registerModel(app, require('./models/undoneDoctor'))
              registerModel(app, require('./models/doctor'))
              cb(null, require('./routes/doctor/'))
            }, 'doctor')
          },
        },
        {
          path: 'doctors/edit/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/doctor'))
              cb(null, require('./routes/doctor/edit'))
            }, 'doctor')
          },
        },
        {
          path: 'doctors/editFake/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/fakeDoctor'))
              cb(null, require('./routes/doctor/editFake'))
            }, 'doctor')
          },
        },
        {
          path: 'doctors/editUndone/:uid',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/undoneDoctor'))
              cb(null, require('./routes/doctor/editUndone'))
            }, 'doctor')
          },
        },
        {
          path: 'departments',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/department/'))
            }, 'department')
          },
        },
        {
          path: 'departments/edit/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/updateHospital'))
              cb(null, require('./routes/department/edit'))
            })
          },
        },
        {
          path: 'diseases',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/diseases/'))
            }, 'diseases')
          },
        },
        {
          path: 'physician-auths',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/doctorVerify/'))
            }, 'doctorVerify')
          },
        },
        {
          path: 'physician-auths/verify/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/verifyDoctorVerify'))
              cb(null, require('./routes/doctorVerify/verify'))
            }, 'doctorVerify')
          },
        },
        {
          path: 'physician-auths/query/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/queryDoctorVerify'))
              cb(null, require('./routes/doctorVerify/query'))
            }, 'doctorVerify')
          },
        },
        {
          path: 'title-auths',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/doctorTitle'))
              cb(null, require('./routes/doctorTitle/'))
            }, 'doctorTitle')
          },
        },
        {
          path: 'title-auths/verify/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/verifyDoctorTitle'))
              cb(null, require('./routes/doctorTitle/verify'))
            })
          },
        },
        {
          path: 'title-auths/query/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/queryDoctorTitle'))
              cb(null, require('./routes/doctorTitle/query'))
            }, 'doctorTitle')
          },
        },
        {
          path: 'idcard-pic-auths',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/patientVerify/'))
            }, 'patientVerify')
          },
        },
        {
          path: 'doctor-profiles',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/doctorProfile'))
              cb(null, require('./routes/doctorProfile/'))
            }, 'doctorProfile')
          },
        },
        {
          path: 'doctor-profiles/verify/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/verifyDoctorProfile'))
              cb(null, require('./routes/doctorProfile/verify'))
            }, 'doctorProfile')
          },
        },
        {
          path: 'members',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/members/'))
            }, 'members')
          },
        },
        {
          path: 'help',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/helpList'))
              cb(null, require('./routes/helpList/'))
            }, 'help')
          },
        },
        {
          path: 'help/update/new',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/helpModal'))
              cb(null, require('./routes/helpList/update'))
            }, 'help')
          },
        },
        {
          path: 'help/update/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/helpModal'))
              cb(null, require('./routes/helpList/update'))
            }, 'help')
          },
        },
        {
          path: 'order-cancel',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/orderCancel'))
              cb(null, require('./routes/orderCancel/'))
            }, 'order-cancel')
          },
        },
        {
          path: 'cases',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/cases/'))
            }, 'cases')
          },
        },
        {
          path: 'withdraw-bills',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/withdrawBills/'))
            }, 'withdrawBills')
          },
        },
        {
          path: 'video-orders',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/videoOrders'))
              cb(null, require('./routes/videoOrders'))
            }, 'videoOrders')
          },
        },
        {
          path: 'video-orders/edit/:orderNo',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/videoOrders'))
              cb(null, require('./routes/videoOrders/edit'))
            })
          },
        },
        {
          path: 'remote-consult',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/remoteConsult'))
            }, 'remoteConsult')
          },
        },
        {
          path: 'remote-consult/edit/new',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/remoteConsult/edit'))
            }, 'remoteConsult')
          },
        },
        {
          path: 'remote-consult/edit/:orderNo',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/remoteConsult/edit'))
            }, 'remoteConsult')
          },
        },
        {
          path: 'rc-hospital',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/rcHospital'))
              cb(null, require('./routes/rcHospital'))
            }, 'remoteConsult')
          },
        },
        {
          path: 'rc-hospital/edit/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/rcHospital'))
              cb(null, require('./routes/rcHospital/edit'))
            }, 'remoteConsult')
          },
        },
        {
          path: 'rc-hospital/edit/new',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/rcHospital'))
              cb(null, require('./routes/rcHospital/edit'))
            }, 'remoteConsult')
          },
        },
        {
          path: 'hospital-cates',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/hospitalCate'))
            })
          },
        },
        {
          path: 'hospital-cates/edit/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              // registerModel(app, require('./models/updateHospital'))
              cb(null, require('./routes/hospitalCate/edit'))
            })
          },
        },
        {
          path: '/tag-templates',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/tagTemplates'))
              cb(null, require('./routes/tagTemplates'))
            })
          },
        },
        {
          path: '/tag-templates/edit/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/tagTemplates'))
              cb(null, require('./routes/tagTemplates/edit'))
            })
          },
        },
        {
          path: '/tag-templates/edit/new',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/tagTemplates'))
              cb(null, require('./routes/tagTemplates/edit'))
            })
          },
        },
        {
          path: '/hot-keywords',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/hotKeywords'))
              cb(null, require('./routes/hotKeywords'))
            })
          },
        },
        {
          path: '/questions',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/questions'))
              cb(null, require('./routes/questions'))
            })
          },
        },
        {
          path: 'agencies',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/agency'))
              cb(null, require('./routes/agencies'))
            })
          },
        },
        {
          path: 'agencies/edit/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/agency'))
              cb(null, require('./routes/agencies/edit'))
            })
          },
        },
        {
          path: 'agencies/withdraw-bills',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/agenWithdrawBills'))
              cb(null, require('./routes/agenWithdrawBills'))
            })
          },
        },
        {
          path: 'agencies/withdraw-bills/edit/:code',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/agenWithdrawBills'))
              cb(null, require('./routes/agenWithdrawBills/edit'))
            })
          },
        },
        {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
