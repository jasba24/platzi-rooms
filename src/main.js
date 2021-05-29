import { createApp } from "vue"
import firebase from "firebase"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { getService } from "./filters/getService"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
	faSearch,
	faPlus,
	faBell,
	faPowerOff,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faSearch, faPlus, faBell, faPowerOff)

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

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		store.dispatch("FETCH_AUTH_USER")
	}
})

const app = createApp(App)
app.config.globalProperties.$filters = {
	getService,
}

app.component("font-awesome-icon", FontAwesomeIcon)
app.use(store)
app.use(router)
app.mount("#app")
