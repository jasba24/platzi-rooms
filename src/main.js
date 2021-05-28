import { createApp } from "vue"
import firebase from "firebase"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { getService } from "./filters/getService"

const firebaseConfig = {
	apiKey: "AIzaSyA-JXZsHXkHrfEe672K2KoOXE4bwZXMsgg",
	authDomain: "platzi-rooms-946fb.firebaseapp.com",
	databaseURL: "https://platzi-rooms-946fb-default-rtdb.firebaseio.com",
	projectId: "platzi-rooms-946fb",
	storageBucket: "platzi-rooms-946fb.appspot.com",
	messagingSenderId: "161802258695",
	appId: "1:161802258695:web:814d2568ca58fc99075da2",
	measurementId: "G-E4088TXBL0",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const app = createApp(App)
	app.config.globalProperties.$filters = {
		getService,
	}

	app.use(store)
	app.use(router)
	app.mount("#app")
