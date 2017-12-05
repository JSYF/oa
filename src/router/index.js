import Vue from 'vue'
import Router from 'vue-router'
import Approve from '@/components/Approve'
import Task from '@/components/Task'
import ApproveLunch from "@/components/approve/Lunch"
import ApproveLunchList from '@/components/approve/LunchList'
import ApproveLunching from "@/components/approve/Lunching"
import ApproveDetails from "@/components/approve/Details";
Vue.use(Router)
import store from "../store";
const router = new Router({
  routes: [
    {
      path: '/approve',
      name: 'approve',
      component: Approve
    },
    {
      path: "/approve/details",
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
router.beforeResolve((to, from, next) => {

  store.dispatch("updateUser")
    .then(() => {
      console.log("用户信息更新");
      next();
    })
})
export default router;