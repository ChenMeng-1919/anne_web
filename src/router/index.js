import Vue from 'vue'
import Router from 'vue-router'
import prodtrace from "../components/prodtrace";
import notfound from "../components/notfound";
import lobtrace from "../components/lobtrace";
import monthlycheckout from "../components/monthlycheckout";
import querydata from "../components/querydata";
import addDetails from "../components/manualincomedis/addDetails";
import addIncomedisHead from "../components/manualincomedis/addIncomedisHead";
import incomedisDetails from "../components/manualincomedis/incomedisDetails";
import incomedisHead from "../components/manualincomedis/incomedisHead";
import uploadFile from "../components/manualincomedis/uploadFile";
import Editor from "../components/Editor";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/uploadFile',
      name: "uploadFile",
      component: uploadFile
    },
    {
      path: '/incomedisHead',
      name: "incomedisHead",
      component: incomedisHead
    },
    {
      path: '/incomedisDetails',
      name: "incomedisDetails",
      component: incomedisDetails
    },
    {
      path: '/addIncomedisHead',
      name: "addIncomedisHead",
      component: addIncomedisHead
    },
    {
      path: '/addDetails',
      name: "addDetails",
      component: addDetails
    },
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
      path: '/Editor',
      name: "Editor",
      component: Editor
    },
    {
      path: '/',
      redirect: '/Editor'
    },
    {
      path: '*',
      component: notfound
    },
  ]
})
