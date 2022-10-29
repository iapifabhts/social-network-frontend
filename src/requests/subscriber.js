import { get, post, del } from "./index.js"

export const getSubscribers = (userId, limit, offset, username = "") => {
	return get(`/users/${userId}/subscribers?limit=${limit}&offset=${offset}&username=${username}`)
}

export const getSubscriptions = (userId, limit, offset, username = "") => {
	return get(`/users/${userId}/subscriptions?limit=${limit}&offset=${offset}&username=${username}`)
}

export const subscribe = userId => {
	return post(`/users/${userId}/subscribers`)
}

export const unsubscribe = userId => {
	return del(`/users/${userId}/subscribers`)
}
