import Vue from 'vue'
import Router from 'vue-router'
import Start from '../components/pages/StartPage'
import Documents from '../components/pages/DocumentsPage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/documents',
      name: 'Documents',
      component: Documents
    }
  ]
})
