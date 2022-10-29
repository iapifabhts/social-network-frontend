import { get, post, patch } from "./index.js"

export const signIn = (username, password) => {
	return post("/signIn", { username, password })
}

export const signUp = (username, password) => {
	return post("/users", { username, password })
}

export const identifyMe = () => {
	return get("/identifyMe")
}

export const updateUser = (userId, avatarId, profileImageId) => {
	return patch(`/users/${userId}`, {
		avatarId,
		profileImageId,
	})
}

export const getUserById = id => {
	return get(`/users/${id}`)
}

export const getAllUsers = username => {
	return get(`/users?username=${username}`)
}
