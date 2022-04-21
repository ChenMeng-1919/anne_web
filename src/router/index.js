import Vue from 'vue'
import Router from 'vue-router'
import prodtrace from "../components/prodtrace";
import notfound from "../components/notfound";
import lobtrace from "../components/lobtrace";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/prodtrace',
      name: "prodtrace",
      component: prodtrace
    },
    {
      path: '/lobtrace',
      name: "lobtrace",
      component: lobtrace
    },
    {
      path: '/',
      redirect: '/prodtrace'
    },
    {
      path: '*',
      component: notfound
    },
  ]
})
