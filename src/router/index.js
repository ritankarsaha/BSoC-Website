import { projectAuth } from '@/firebase/config'
import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Auth from '@/views/Auth'
import Dashboard from '@/views/Dashboard'
import Home from '@/views/Home'
import LandingPage from '@/views/LandingPage'
import MyPR from '@/views/MyPR'
import Projects from '@/views/Projects'
import SubmitPR from '@/views/SubmitPR'
import User from '@/views/User'

const requireAuth = (to, from, next) => {
	let user = projectAuth.currentUser
	if (!user) {
		next({ path: '/auth' })
	} else {
		next()
	}
}

const requireNoAuth = (to, from, next) => {
	let user = projectAuth.currentUser
	if (user) {
		next({ path: '/dashboard' })
	} else {
		next()
	}
}

const routes = [
	{
		path: '/',
		name: 'LandingPage',
		component: LandingPage,
	},
	{
		path: '/auth',
		name: 'Auth',
		component: Auth,
		beforeEnter: requireNoAuth,
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
		beforeEnter: requireAuth,
	},
	{
		path: '/submit',
		name: 'Submit',
		component: SubmitPR,
		beforeEnter: requireAuth,
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		beforeEnter: requireNoAuth,
	},
	{
		path: '/signUp',
		name: 'SignUp',
		component: Signup,
		beforeEnter: requireNoAuth,
	},
	{
		path: '/projects',
		name: 'Project',
		component: Projects,
	},
	{
		path: '/myPR',
		name: 'MyPR',
		component: MyPR,
	},
	{
		path: '/user/:uid',
		name: 'User',
		component: User,
		props: true,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
