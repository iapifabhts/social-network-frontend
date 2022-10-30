<style lang="scss" scoped>
.subscribers {
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
	<div class="subscribers">
		<header class="subscribers__header">
			<Input
				v-model="username"
				placeholder="Search"
			/>
		</header>
	</div>
	<div class="subscribers__cards">
		<Card
			v-for="user in subscribers"
			:user="user"
		/>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { getSubscribers } from "../requests/subscriber.js"
import Card from "./Card.vue"
import Input from "../ui/Input.vue"

const route = useRoute()

const subscribers = ref([])
const username = ref("")

const getSubscribersHandler = id => {
	getSubscribers(id, 10, 0, username.value)
		.then(({ data }) => {
			subscribers.value = data.subscribers
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

onMounted(() => {
	getSubscribersHandler(route.params.id)
})

watch(route, (from, to) => {
	getSubscribersHandler(to.params.id)
})

watch(username, val => {
	getSubscribersHandler(route.params.id, 10, 0, val)
})

</script>
