<style lang="scss" scoped>
.subscriptions {
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
	<div class="subscriptions">
		<header class="subscriptions__header">
			<Input
				v-model="username"
				placeholder="Search"
			/>
		</header>
	</div>
	<div class="subscriptions__cards">
		<Card
			v-for="user in subscriptions"
			:user="user"
		/>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { getSubscriptions } from "../requests/subscriber.js"
import Card from "./Card.vue"
import Input from "../ui/Input.vue"

const route = useRoute()

const subscriptions = ref([])
const username = ref("")

const getSubscriptionsHandler = id => {
	getSubscriptions(id, 10, 0, username.value)
		.then(({ data }) => {
			subscriptions.value = data.subscriptions
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

onMounted(() => {
	getSubscriptionsHandler(route.params.id)
})

watch(route, (from, to) => {
	getSubscriptionsHandler(to.params.id)
})

watch(username, val => {
	getSubscriptionsHandler(route.params.id, 10, 0, val)
})

</script>
