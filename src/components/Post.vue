<style lang="scss" scoped>
.post {
	display: flex;
	flex-direction: column;
	row-gap: 10px;

	&__title {
		margin: 10px 30px;
		font-weight: 500;
	}

	&__files {
		display: grid;
		grid-template-columns: repeat(3, 240px);
		grid-gap: 5px;
	}

	&__file {
		border-radius: 10px;
		overflow: hidden;
		height: 240px;

		&:hover {
			img {
				transform: scale(1.05);
			}
		}

		img {
			width: 100%;
			height: 100%;
			transition: all .5s;
		}
	}

	&__footer {
		background-color: #ffffff;
		border-radius: 10px;
		padding: 10px 30px;
		display: flex;
		align-items: center;
		column-gap: 20px;
	}

	&__comments,
	&__likes {
		display: flex;
		align-items: center;
		column-gap: 5px;
		user-select: none;
		position: relative;
	}

	&__likes:hover {
		.likes__info {
			display: flex;
		}
	}

	&__comments:hover {
		.comments__info {
			display: flex;
		}
	}
}

.likes__info,
.comments__info {
	position: absolute;
	top: 20px;
	left: 10px;
	transform: translateX(-50%);
	display: none;
}

.icon {
	&-like,
	&-comment {
		cursor: pointer;
	}
}
</style>

<template>
	<div class="post">
		<Card
			:user="post.user"
			:date="post.dateOfCreation"
			:title="post.title"
		/>
		<div class="post__files">
			<div
				class="post__file"
				v-for="file in post.files"
			>
				<img
					v-if="file.type === `image`"
					:src="getSrc(file.id)"
				/>
			</div>
		</div>
		<div class="post__footer">
			<div class="post__likes">
				<Like
					class="icon-like"
					v-if="!iLike"
					@click="likeThePostHandler"
				/>
				<AltLike
					class="icon-like"
					v-else
					@click="removeLikeFromPostHandler"
				/>
				{{ numberOfLikes }}
				<Info
					v-if="likes?.length"
					class="likes__info"
					:users="likes"
				/>
			</div>

			<div class="post__comments">
				<Comment
					class="icon-comment"
					@click="$router.push(`/posts/${post.id}/comments`)"
				/>
				{{ numberOfComments }}
				<Info
					v-if="comments?.length"
					class="comments__info"
					:users="comments"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from "vue"
import { getAllPostLikes, likeThePost, removeLikeFromPost } from "../requests/like.js"
import { getAllComments } from "../requests/comment.js"
import Card from "./Card.vue"
import Info from "./Info.vue"
import Like from "../icons/Like.vue"
import AltLike from "../icons/AltLike.vue"
import Comment from "../icons/Comment.vue"

const props = defineProps({
	post: {
		type: Object,
		required: true
	},
})

const iLike = ref(false)
const likes = ref([])
const numberOfLikes = ref(0)
const comments = ref([])
const numberOfComments = ref(0)

onMounted(() => {
	getAllPostLikesHandler(props.post.id)
	getAllCommentsHandler(props.post.id)
})

watch(props, val => {
	getAllPostLikesHandler(val.post.id)
	getAllCommentsHandler(val.post.id)
})

const getAllPostLikesHandler = postId => {
	getAllPostLikes(postId, 3, 0)
		.then(({ data }) => {
			likes.value = data.likes
			numberOfLikes.value = data.numberOfLikes
			iLike.value = data.userLiked
		})
		.catch(({ message }) => {
			console.log(message)
		})
}


const likeThePostHandler = () => {
	likeThePost(props.post.id)
		.then(({ data }) => {
			likes.value = data.likes
			numberOfLikes.value = data.numberOfLikes
			iLike.value = data.userLiked
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const removeLikeFromPostHandler = () => {
	removeLikeFromPost(props.post.id)
		.then(({ data }) => {
			likes.value = data.likes
			numberOfLikes.value = data.numberOfLikes
			iLike.value = data.userLiked
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const getAllCommentsHandler = postId => {
	getAllComments(postId, 3, 0)
		.then(({ data }) => {
			comments.value = data.comments
			numberOfComments.value = data.numberOfComments
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const getSrc = id => {
	return `http://localhost:80/files/${id}`
}

</script>
