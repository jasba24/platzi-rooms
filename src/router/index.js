import { createRouter, createWebHashHistory } from "vue-router"

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
	},
	{
		path: "/user/houses",
		name: "HousesPage",
		component: () =>
			import(/* webpackChunkName: "HousesPage" */ "@/views/user/HousesPage"),
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

export default router
