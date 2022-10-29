import { createApp } from "vue"
import { createPinia } from "pinia"
import Router from "./router"
import App from "./App.vue"
import { useUserStore } from "./stores/user.js"

createApp(App)
	.use(Router)
	.use(createPinia())
	.mount("#app")

const store = useUserStore()
Router.beforeEach((to, from, next) => {
	if (to.name !== "signIn" &&
		to.name !== "signUp" &&
		!store.isAuth) next({ path: "/" })
	else next()
})
