import Vue from 'vue'
import Router from 'vue-router'
import Approve from '@/components/Approve'
import Task from '@/components/Task'
import ApproveLunch from "@/components/approve/Lunch"
import ApproveLunchList from '@/components/approve/LunchList'
import ApproveLunching from "@/components/approve/Lunching"
import ApproveDetails from "@/components/approve/Details";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/approve',
      name: 'approve',
      component: Approve
    },
    {
      path: "/approve/details/:params",
      component: ApproveDetails,
      props: true,
      name: "approveDetails"
    },
    {
      path: '/approve/lunch',
      component: ApproveLunch,
      name: "approvelunch",
      children: [{
        path: "list",
        name: "approveList",
        component: ApproveLunchList
      },
      {
        path: "lunching/:params",
        name: "approveLunching",
        props: true,
        component: ApproveLunching
      }
      ]
    },
    {
      path: '/task',
      name: 'task',
      component: Task
    }
  ]
})
