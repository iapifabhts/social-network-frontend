import { get, post } from "./index.js"

export const createPost = (title, fileIds) => {
	return post("/posts", {
		title,
		fileIds,
	})
}

export const getAllPosts = (userId, limit, offset) => {
	return get(`/users/${userId}/posts?limit=${limit}&offset=${offset}`)
}

export const getFeed = (limit, offset) => {
	return get(`/feed?limit=${limit}&offset=${offset}`)
}
