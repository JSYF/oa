import Vue from 'vue'
import Router from 'vue-router'
import Approve from '@/components/Approve'
import Task from '@/components/Task'
import ApproveLunch from "@/components/approve/Lunch"
import ApproveLunchList from '@/components/approve/LunchList'
import ApproveLunching from "@/components/approve/Lunching"
import ApproveDetails from "@/components/approve/Details";
import TaskLunching from "@/components/task/Lunching";
import TaskRemindTime from "@/components/task/RemindTime";
import TaskDetails from "@/components/task/Details";
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
        path: "lunching",
        name: "approveLunching",
        component: ApproveLunching
      }
      ]
    },
    {
      path: '/task',
      name: 'task',
      component: Task
    },
    {
      name: "taskDetails",
      path: "/task/details",
      component: TaskDetails
    }, {
      name: "taskLunching",
      path: "/task/lunching",
      component: TaskLunching
    },
    {
      name: "taskRemindTime",
      path: "/task/lunching/remindTime",
      component: TaskRemindTime
    }
  ]
})
router.beforeResolve((to, from, next) => {
  store.dispatch("updateUser")
    .then(() => {
      // console.log("用户信息更新");
      next();
    })
})
export default router;