import { post } from "./index.js"

export const uploadFile = file => {
	const formData = new FormData()
	formData.append("file", file)
	return post("/files", formData)
}
