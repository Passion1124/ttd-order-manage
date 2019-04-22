import Vue from 'vue'
import Router from 'vue-router'
import orderDate from './views/order_date'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'order_date',
      component: orderDate
    }
  ]
})
