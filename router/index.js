import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import PostsManager from '@/components/PostsManager'
import Edit from '@/components/Edit'
import Ff from '@/components/Ff'
import OktaVue, { LoginCallback } from '@okta/okta-vue'
import { OktaAuth } from '@okta/okta-auth-js'

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-58789190.okta.com/oauth2/default',
  clientId: '0oaq6vedceXwoohyT5d6',
  // redirectUri: window.location.origin + '/callback',
  redirectUri: 'http://localhost:8080/login/callback',
  scopes: ['openid', 'profile', 'email']
})

Vue.use(Router)

Vue.use(OktaVue, { oktaAuth })

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login/callback',
      component: LoginCallback
    },
    {
      path: '/edit/:id/:name/:email', 
      name: 'Edit',
      component: Edit,
      props: true
    },
    {
      path: '/f',
      name: 'Ff',
      component: Ff,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/posts-manager',
      name: 'PostsManager',
      component: PostsManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

export default router
