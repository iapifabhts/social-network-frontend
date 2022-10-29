import { ref } from "vue"
import { defineStore } from "pinia"
import { useRouter, useRoute } from "vue-router"

export const useUserStore = defineStore("user", () => {
	const isAuth = ref(false)
	const user = ref({})
	const router = useRouter()
	const route = useRoute()

	const identify = (_user) => {
		isAuth.value = true
		user.value = _user

		if (route.name === "signIn" || route.name === "signUp") {
			router.push(`/profile/${user.value.id}`)
		}
	}

	return {
		identify,
		isAuth,
		user,
	}
})
