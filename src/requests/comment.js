import { get, post } from "./index.js"

export const getAllComments = (postId, limit, offset) => {
	return get(`/posts/${postId}/comments?limit=${limit}&offset=${offset}`)
}

export const addComment = (postId, body) => {
	return post(`/posts/${postId}/comments`, body)
}
