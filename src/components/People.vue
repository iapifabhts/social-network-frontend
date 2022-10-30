<style lang="scss" scoped>
.people {
	&__header {
		display: flex;
		justify-content: end;
		margin-bottom: 30px;
	}

	&__cards {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}
}
</style>

<template>
	<div class="people">
		<header class="people__header">
			<Input
				placeholder="Search"
				v-model="username"
			/>
		</header>
		<div class="people__cards">
			<Card
				v-for="user in users"
				:user="user"
				@click="$router.push(`/profile/${user.id}`)"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue"
import Card from "./Card.vue"
import Input from "../ui/Input.vue"
import { getAllUsers } from "../requests/user.js"

const users = ref([])
const username = ref("")

getAllUsers(username.value)
	.then(({ data }) => users.value = data)
	.catch(({ message }) => {
		console.log(message)
	})

const getAvatar = avatarId => {
	return avatarId ? `http://localhost/files/${avatarId}` : `${import.meta.env.VITE_URL}/src/images/avatar.jpg`
}

watch(username, val => {
	getAllUsers(val)
		.then(({ data }) => users.value = data)
		.catch(({ message }) => {
			console.log(message)
		})
})

</script>
