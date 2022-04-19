import Vue from 'vue'
import Router from 'vue-router'
import prodtrace from "../components/prodtrace";
import notfound from "../components/notfound";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/prodtrace',
      name: "prodtrace",
      component: prodtrace
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
