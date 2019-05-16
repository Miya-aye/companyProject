import Vue from 'vue'
import Router from 'vue-router'
import Personalcenter from '@/components/personal_center/Personal_center'
import News from '@/components/personal_center/News'
import ChangeCompanyInfo from '@/components/personal_center/change_company_info'
import ChangePersonalInfo from '@/components/personal_center/change_personal_info'

import Test from '@/components/test'
import Addperson from '@/components/addperson'
// import Device from '@/components/device'
// import ShowMember from '@/components/showmember'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Personalcente',
      component: Personalcenter
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/personalcenter',
      name: 'Personalcenter',
      component: Personalcenter
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/changecompanyinfo',
      name: 'ChangeCompanyInfo',
      component: ChangeCompanyInfo
    },
    {
      path: '/changepersonalinfo',
      name: 'ChangePersonalInfo',
      component: ChangePersonalInfo
    },
    {
      path: '/addperson',
      name: 'Addperson',
      component: Addperson
    },
    // {
    //   path: '/device',
    //   name: 'Device',
    //   component: Device
    // },
    // {
    //   path: '/showmember',
    //   name: 'ShowMember',
    //   component: ShowMember
    // },
  ]
})
