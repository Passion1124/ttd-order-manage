import Vue from 'vue'
import Router from 'vue-router'
import orderDate from './views/order_date'
import addOrder from './views/add_order'
import message from './views/message'
import orderTreated from './views/order_treated'
import tablePreview from './views/table_preview'

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
      },
      {
          path: '/message',
          name: 'message',
          component: message
      },
      {
          path: '/order_treated',
          name: 'order_treated',
          component: orderTreated
      },
      {
          path: '/table_preview',
          name: 'table_preview',
          component: tablePreview
      }
  ]
})
