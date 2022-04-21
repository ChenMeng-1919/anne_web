import Vue from 'vue'
import Router from 'vue-router'
import prodtrace from "../components/prodtrace";
import notfound from "../components/notfound";
import lobtrace from "../components/lobtrace";
import monthlycheckout from "../components/monthlycheckout";
import querydata from "../components/querydata";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/querydata',
      name: "querydata",
      component: querydata
    },
    {
      path: '/monthlycheckout',
      name: "monthlycheckout",
      component: monthlycheckout
    },
    {
      path: '/lobtrace',
      name: "lobtrace",
      component: lobtrace
    },
    {
      path: '/prodtrace',
      name: "prodtrace",
      component: prodtrace
    },
    {
      path: '/',
      redirect: '/querydata'
    },
    {
      path: '*',
      component: notfound
    },
  ]
})
