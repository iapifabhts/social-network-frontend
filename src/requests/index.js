import axios from "axios"

const object = axios.create({
	baseURL: "http://localhost:80",
	withCredentials: true
})

export const get = object.get
export const post = object.post
export const patch = object.patch
export const del = object.delete
