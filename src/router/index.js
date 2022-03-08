import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import notebookList from '../components/NotebookList'
import noteDetail from '../components/NoteDetail'
import TrashDetail from '../components/TrashDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/notebooks',
      component: notebookList
    },
    {
      path: '/note',
      component: noteDetail
    },
    {
      path:'/trash',
      component:TrashDetail
    }
  ]
})
