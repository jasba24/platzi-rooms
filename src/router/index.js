import { createRouter, createWebHashHistory } from "vue-router"
import store from "../store"

const routes = [
	{
		path: "/",
		name: "HomePage",
		component: () =>
			import(/* webpackChunkName: "HomePage" */ "@/views/HomePage"),
	},
	{
		path: "/search",
		name: "SearchPage",
		component: () =>
			import(/* webpackChunkName: "SearchPage" */ "@/views/SearchPage"),
	},
	{
		path: "/user/",
		redirect: { name: "ProfilePage" },
	},
	{
		path: "/user/profile",
		name: "ProfilePage",
		component: () =>
			import(/* webpackChunkName: "ProfilePage" */ "@/views/user/ProfilePage"),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/user/houses",
		name: "HousesPage",
		component: () =>
			import(/* webpackChunkName: "HousesPage" */ "@/views/user/HousesPage"),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/house",
		redirect: { name: "ProfilePage" },
	},
	{
		path: "/house/new",
		name: "CreateHousePage",
		component: () =>
			import(
				/* webpackChunkName: "CreateHousePage" */ "@/views/CreateHousePage"
			),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/*",
		name: "NotFoundPage",
		component: () =>
			import(/* webpackChunkName: "NotFoundPage" */ "@/views/NotFoundPage"),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(route => route.meta.requiresAuth)) {
		if (store.state.authId) {
			next()
		} else {
			next({ name: "HomePage" })
		}
	} else {
		next()
	}
})

export default router
