import { defineStore } from "pinia"
import { ref } from "vue"

export const useNotificationStore = defineStore("notification", () => {
	const seen = ref(false)
	const notifications = ref([])
	const notify = notification => {
		notifications.value.push(notification)
		setTimeout(() => {
			notifications.value.shift()
		}, 5000)
	}

	return {
		seen,
		notify,
		notifications,
	}
})
