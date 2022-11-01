import { get } from "./index.js"
import { useNotificationStore } from "../stores/notification.js"

export const subscribe = () => {
	const store = useNotificationStore()
	get("/notification/subscribe")
		.then(({ data }) => {
			store.notify(data)
			subscribe()
		})
		.catch(({ message }) => {
			console.log(message)
		})
}
