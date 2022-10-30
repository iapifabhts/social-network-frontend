<style lang="scss" scoped>
.feed {
	display: flex;
	flex-direction: column;
	row-gap: 30px;
}
</style>

<template>
	<div class="feed">
		<Post
			v-for="post in posts"
			:post="post"
		/>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getFeed } from "../requests/post.js"
import Post from "./Post.vue"

const posts = ref([])

onMounted(() => {
	getFeed(10, 0)
		.then(({ data }) => {
			posts.value = data
		}).catch(({ message }) => {
		console.log(message)
	})
})

</script>
