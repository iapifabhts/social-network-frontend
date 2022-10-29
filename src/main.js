import { createApp } from "vue"
import { createPinia } from "pinia"
import Router from "./router"
import App from "./App.vue"

createApp(App)
	.use(Router)
	.use(createPinia())
	.mount("#app")
