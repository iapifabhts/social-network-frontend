import { get, post } from "./index.js"

export const getDialogIdByMembers = id =>
	get(`/users/${id}/dialog`)

export const getChatById = id =>
	get(`/chats/${id}`)

export const createChat = (userIds, type = "dialog", name = null, avatarId = null) =>
	post("/chats", {
		type,
		userIds,
		name,
		avatarId,
	})

export const connect = id =>
	new WebSocket(`ws://localhost:80/chats/${id}/connect`)

export const getAllMessages = chatId =>
	get(`/chats/${chatId}/messages`)
