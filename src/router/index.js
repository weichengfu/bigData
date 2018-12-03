import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/components/page'
import Test from '@/components/test'
import Details from '@/components/details'
import Activities from '@/components/activities'
import Test1 from '@/components/test1'
import Test2 from '@/components/test2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'page',
      component: Page
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities
    },
    {
      path: '/detail',
      name: 'detail',
      component: Details
    },
    {
      path: '/test1',
      name: 'test1',
      component: Test1
    },
    {
      path: '/test2',
      name: 'test2',
      component: Test2
    }
  ]
})
