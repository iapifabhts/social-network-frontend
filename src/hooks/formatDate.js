export const formatDate = date => {
	const [first, second] = [...date.split(".")[0].split("T")]
	return `${first.split("-").reverse().join(".")} ${second.split(":").slice(0, 2).join(":")}`
}
