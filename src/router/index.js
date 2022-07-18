import Vue from 'vue'
import Router from 'vue-router'
import notfound from "../components/notfound";
import Editor from "../components/sysnotices/Editor";
import mainpage from "../components/sysnotices/mainpage";
import detailpage from "../components/sysnotices/detailpage";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Editor',
      name: "Editor",
      component: Editor
    },
    {
      path: '/mainpage',
      name: "mainpage",
      component: mainpage
    },
    {
      path: '/detailpage',
      name: "detailpage",
      component: detailpage
    },
    {
      path: '/',
      redirect: '/mainpage'
    },
    {
      path: '*',
      component: notfound
    },
  ]
})
