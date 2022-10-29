<style lang="scss" scoped>
.form {
	display: flex;
	flex-direction: column;
	row-gap: 30px;

	&__title {
		font-size: 20px;
		text-transform: uppercase;
		text-align: center;
	}

	&__link {
		text-decoration: none;
		color: #72b2e4;
		font-size: 15px;
	}
}
</style>

<template>
	<form @submit.prevent class="form">
		<h2 class="form__title">Sign in</h2>
		<Input
			label="Username"
			v-model="username"
		/>
		<Input
			label="Password"
			type="password"
			v-model="password"
		/>
		<Button @click="signInHandler">Sign in</Button>
		<router-link
			class="form__link"
			to="/signUp"
		>Sign up</router-link>
	</form>
</template>

<script setup>
import { ref } from "vue"
import Input from "../ui/Input.vue"
import Button from "../ui/Button.vue"
import { signIn } from "../requests/user.js"
import { useUserStore } from "../stores/user.js"

const store = useUserStore()
const [ username, password ] = [ ref(""), ref("") ]

const signInHandler = () => {
	signIn(username.value, password.value)
		.then(({ data }) => {
			store.identify(data)
		}).catch(({ message }) => {
		console.log(message)
	})
}

</script>
