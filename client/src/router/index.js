import Vue from 'vue'
import Router from 'vue-router'
import Markdown from  '../components/Markdown'
import Documents from '../components/Documents'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Markdown',
      component: Markdown
    },
    {
      path: '/list',
      name: 'Documents',
      component: Documents
    }
  ]
})
