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
      alias:'/notebooks',
      component: ()=>import('../components/NotebookList')
    },
    {
      path: '/login',
      component: ()=>import('../components/Login')
    },
    {
      path: '/note',
      component: ()=>import('../components/NoteDetail')
    },
    {
      path:'/trash',
      component: ()=>import('../components/TrashDetail')
    }
  ]
})
