<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: roboto, serif;
	font-size: 15px;
	font-weight: 500;
}

body {
	background-color: #e9ebf1;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}
</style>

<template>
	<component :is="layout" />
</template>

<script setup>
import { onMounted, computed } from "vue"
import { identifyMe } from "./requests/user.js"
import { useUserStore } from "./stores/user.js"
import { useRouter, useRoute } from "vue-router"
import Main from "./layouts/Main.vue"

const store = useUserStore()
const router = useRouter()
const route = useRoute()

const layout = computed(() => {
	return route.meta.layout ?? Main
})

onMounted(() => {
	identifyMe().then(({ data }) => {
		store.identify(data)
	}).catch(({ message }) => {
		console.log(message)
		router.push("/")
	})
})

</script>
