import Vue from 'vue'
import Router from 'vue-router'
import orderDate from './views/order_date'
import addOrder from './views/add_order'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/order_date'
      },
      {
          path: '/order_date',
          name: 'order_date',
          component: orderDate
      },
      {
          path: '/add_order',
          name: 'add_order',
          component: addOrder
      }
  ]
})
