<style lang="scss" scoped>
.comments {
	display: flex;
	flex-direction: column;
	row-gap: 10px;

	&__header {
		display: grid;
		grid-template-columns: 3fr 1fr;
		grid-column-gap: 10px;
	}

	&__comment {
		border-radius: 10px;
		background-color: #ffffff;
		padding: 10px 30px;
	}
}

.comment {
	&__header {
		display: flex;
		column-gap: 10px;
		margin-bottom: 10px;
	}

	&__avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		cursor: pointer;
	}

	&__content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	&__date {
		font-weight: 300;
		font-size: 10px;
		color: rgba(#000000, .5);
	}
}
</style>

<template>
	<div class="comments">
		<header class="comments__header">
			<Input
				v-model="body"
				placeholder="Comment"
			/>
			<Button
				@click="addCommentHandler"
			>Submit</Button>
		</header>
		<div
			class="comments__comment"
			v-for="comment in comments"
		>
			<header class="comment__header">
				<img
					@click="$router.push(`/profile/${comment.creator.id}`)"
					class="comment__avatar"
					:src="getAvatar(comment.creator.avatarId)"
				/>
				<div class="comment__content">
					<span class="comment__username">{{ comment.creator.username }}</span>
					<span
						class="comment__date"
					>{{ formatDate(comment.dateOfCreation) }}</span>
				</div>
			</header>
			{{ comment.body }}
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import { getAllComments, addComment } from "../requests/comment.js"
import { useRoute } from "vue-router"
import { getAvatar } from "../hooks/getAvatar.js"
import { formatDate } from "../hooks/formatDate.js"
import Input from "../ui/Input.vue"
import Button from "../ui/Button.vue"

const route = useRoute()
const comments = ref([])
const body = ref("")

onMounted(() => {
	getAllCommentsHandler(route.params.id, 10, 0)
})

watch(route, val => {
	getAllCommentsHandler(val.params.id, 10, 0)
})

const getAllCommentsHandler = (id, limit, offset) => {
	getAllComments(id, limit, offset)
		.then(({ data }) => {
			comments.value = data.comments
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const addCommentHandler = () => {
	addComment(route.params.id, body.value)
		.then(({ data }) => {
			comments.value.unshift(data)
			body.value = ""
		})
		.catch(({ message }) => {
			console.log(message)
		})
}
</script>
