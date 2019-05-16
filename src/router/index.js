import Vue from 'vue'
import Router from 'vue-router'
import ShowMember from '@/components/ShowMember'
import device from '@/components/device_control/device'
import DeviceList from '@/components/device_control/DeviceList'
import ceshi from '@/components/ceshi'
import Resigned from '@/components/person_leave/Resigned'
import EntranceRule from '@/components/systemsetting/rules/EntranceRule'
import InfoRule from '@/components/systemsetting/rules/InfoRule'
import WarningRule from '@/components/systemsetting/rules/WarningRule'
import AttendControl from '@/components/attendance/AttendControl'
import visitor from '@/components/visitor/visitor'
import VisitorRule from '@/components/visitor/VisitorRule'
import StrangerWarning from '@/components/warningtips/StrangerWarning'
import BlackListWarning from '@/components/warningtips/BlackListWarning'
import PathAnalysis from '@/components/path/PathAnalysis'
import SnapRecord from '@/components/snaprecord/SnapRecord'
import CaseManager from '@/components/case/CaseManager'
import ShowPerson from '@/components/personmag/ShowPerson'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShowMember',
      component: ShowMember
    },
    {
      path: '/device',
      name: 'device',
      component: device
    },
    {
      path: '/ceshi',
      name: 'ceshi',
      component: ceshi
    },
    {
      path: '/resigned',
      name: 'Resigned',
      component: Resigned
    },
    {
      path: '/entrancerule',
      name: 'EntranceRule',
      component: EntranceRule
    },
    {
      path: '/inforule',
      name: 'InfoRule',
      component: InfoRule
    },
    {
      path: '/warningrule',
      name: 'WarningRule',
      component: WarningRule
    },
    {
      path: '/devicelist',
      name: 'DeviceList',
      component: DeviceList
    },
    {
      path: '/attendcontrol',
      name: 'AttendControl',
      component: AttendControl
    },
    {
      path: '/visitor',
      name: 'visitor',
      component: visitor
    },
    {
      path: '/visitorrule',
      name: 'VisitorRule',
      component: VisitorRule
    },
    {
      path: '/strangerwarning',
      name: 'StrangerWarning',
      component: StrangerWarning
    },
    {
      path: '/blacklistwarning',
      name: 'BlackListWarning',
      component: BlackListWarning
    },
    {
      path: '/pathanalysis',
      name: 'PathAnalysis',
      component: PathAnalysis
    },
    {
      path: '/snaprecord',
      name: 'SnapRecord',
      component: SnapRecord
    },
    {
      path: '/casemanager',
      name: 'CaseManager',
      component: CaseManager
    },
    {
      path: '/showperson',
      name: 'ShowPerson',
      component: ShowPerson
    }
  ]
})
