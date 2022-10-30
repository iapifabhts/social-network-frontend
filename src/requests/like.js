import { get, post, del } from "./index.js"

export const getAllPostLikes = (postId, limit, offset) => {
	return get(`/posts/${postId}/likes?limit=${limit}&offset=${offset}`)
}

export const likeThePost = postId => {
	return post(`/posts/${postId}/likes`)
}

export const removeLikeFromPost = postId => {
	return del(`/posts/${postId}/likes`)
}
