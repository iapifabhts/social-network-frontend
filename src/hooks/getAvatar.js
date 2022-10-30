export const getAvatar = id => {
	return id ? `http://localhost:80/files/${id}` :
		`${import.meta.env.VITE_URL}/src/images/avatar.jpg`
}
