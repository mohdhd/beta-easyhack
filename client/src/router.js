import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import auth from "./auth.js"

import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Challenges from './views/Challenges.vue'
import Scoreboard from './views/Scoreboard.vue'
import AddChallenge from './views/AddChallenge.vue'
import Admin from './views/Admin';
import Ctf from './views/CtfInfo';
import ManageChallenges from './views/ManageChallenges';
import ManageUsers from './views/ManageUsers';
import NotifyUsers from './views/NotifyUsers';
import ManageWriteups from './views/ManageWriteups';
import EditChallenge from './views/EditChallenge';
import Categories from './views/Categories';
import LiveCtf from './views/LiveCtf';
import LiveScoreboard from './views/LiveScoreboard';
import PasswordRecovery from './views/RecoverPassword';
import ErrorPage from './views/404';

Vue.use(Router)
Vue.use(Meta)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/challenges/:cat',
      name: 'challenges',
      component: Challenges,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/livectf',
      name: 'EasyHack Ctf',
      component: LiveCtf,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/liveboard',
      name: 'Ctf Scoreboard',
      component: LiveScoreboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      component: Scoreboard
    },
    {
      path: '/addchallenge',
      name: 'addchallenge',
      component: AddChallenge,
      meta: {
        requiresAdmin: true,
        requiresAuth: true
      }
    },
    {
      path: '/recoverpassword',
      name: 'recoverpassword',
      component: PasswordRecovery,
    },
    {
      path:'/editchallenge/:id',
      name:'edit challenge',
      component:EditChallenge,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      },
    },
    {
      path:'/categories',
      name:'challeges categories',
      component:Categories,
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/admin',
      name:'admin',
      component:Admin,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      },

      children:[
        {
          name:'ctf info',
          path:'ctf',
          component:Ctf
        },
        {
          name:'mange challenges',
          path:'challenges',
          component:ManageChallenges
        },
        {
          name:'manage users',
          path:'users',
          component:ManageUsers
        },
        {
          name:'notfiy users',
          path:'notify',
          component:NotifyUsers
        },
        {
          name:'manage writeups',
          path:'writeups',
          component:ManageWriteups
        }

      ]
    },
    {
      path: '*',
      name: 'error page',
      component: ErrorPage
    },
  ]
})

router.beforeEach((to, from, next) => { 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in 
    // if not, redirect to login page. 
    if(!auth.authenticated()){
      next("/login")
    }else{
      if(to.matched.some(record => record.meta.requiresAdmin)){
        if(!auth.user().isAdmin){
          next("/");
        }else{
          next();
        }
      }
      next();
    }
  } else {
    next(); // make sure to call next at the end
  }
}) 

export default router;