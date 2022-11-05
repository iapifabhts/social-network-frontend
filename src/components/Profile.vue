<style lang="scss" scoped>
.profile {
	font-weight: 500;

	&__header {
		height: 390px;
		width: 100%;
		border-radius: 10px;
		overflow: hidden;
	}

	&__info {
		border-radius: 10px;
		background-color: #ffffff;
		height: 60px;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
		align-items: center;
		text-transform: uppercase;
		margin-bottom: 10px;
		color: #72b2e4;
	}

	&__posts {
		display: flex;
		flex-direction: column;
		row-gap: 30px;
	}

	&__button {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-bottom: 10px;
	}

	&__form {
		display: flex;
		flex-direction: column;
		row-gap: 30px;
	}

	&__uploader {
		font-size: 15px;
		border: none;
		border-radius: 10px;
		padding: 10px;
		transition: box-shadow .25s;
		background-color: #ffffff;
		display: flex;
		column-gap: 10px;
		align-items: center;
		cursor: pointer;

		input {
			display: none;
		}

		&:hover,
		&:focus {
			box-shadow: 0 0 0 5px rgba(#72b2e4, .2);
		}

		&:focus {
			outline: none;
		}
	}
}

.header {
	&__header {
		display: block;
		width: 100%;
		height: 70%;

		input {
			display: none;
		}
	}

	&__file {
		&--active {
			cursor: pointer;
		}

		input {
			display: none;
		}
	}

	&__avatar {
		width: 180px;
		height: 180px;
		border-radius: 50%;
		position: absolute;
		top: -90px;
		left: 20px;
	}

	&__footer {
		background-color: #ffffff;
		height: 30%;
		position: relative;
		border-radius: 10px;
		margin-top: -10px;
	}
}

.footer {
	&__content {
		margin-left: 200px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	&__username {
		align-self: flex-start;
		margin-bottom: auto;
	}

	&__buttons {
		align-self: flex-end;
		display: flex;
		align-items: center;
		column-gap: 10px;
	}
}

.info__content {
	cursor: pointer;
}
</style>

<template>
	<div class="profile">
		<header class="profile__header">
			<label
				class="header__header"
				:style="{
					background: `url(${getCover}) no-repeat center / cover`,
					cursor: isMyProfile ? `pointer` : `default`,
				}"
			>
				<input
					type="file"
					v-if="isMyProfile"
					@change="updateProfileImage($event)"
				/>
			</label>
			<footer class="header__footer">
				<label
					class="header__file"
					:class="{ 'header__file--active': isMyProfile }"
				>
					<img
						class="header__avatar"
						:src="getAvatar"
					/>
					<input
						type="file"
						v-if="isMyProfile"
						@change="updateAvatar($event)"
					/>
				</label>
				<div class="footer__content">
					<h2 class="footer__username">{{ user.username }}</h2>
					<div class="footer__buttons" v-if="!isMyProfile">
						<Button
							@click="startDialogueHandler()"
						>Start a dialogue</Button>
						<Button
							class="footer__button"
							v-if="!subscribers.userSubscribed"
							@click="subscribeHandler"
						>Subscribe</Button>
						<Button
							class="footer__button"
							v-else
							@click="unsubscribeHandler"
						>Unsubscribe</Button>
					</div>
				</div>
			</footer>
		</header>
		<div class="profile__info">
			<span
				class="info__content"
				@click="$router.push(`/profile/${user.id}/subscribers`)"
			>
				Subscribers: {{ subscribers.numberOfSubscribers }}
			</span>
			<span
				class="info__content"
				@click="$router.push(`/profile/${user.id}/subscriptions`)"
			>
				Subscriptions: {{ subscriptions.numberOfSubscriptions }}
			</span>
		</div>
		<div class="profile__button" v-if="isMyProfile">
			<Button @click="dialog = true">Create post</Button>
		</div>
		<div class="profile__posts">
			<Post
				v-for="post in posts"
				:post="post"
			/>
		</div>
	</div>
	<Dialog v-model="dialog">
		<form @submit.prevent class="profile__form">
			<Input
				v-model="title"
				placeholder="Title"
			/>
			<label class="profile__uploader">
				<File /> To add a file
				<input
					type="file"
					@change="uploadFileHandler($event)"
				/>
			</label>
			<Button @click="createPostHandler">Create</Button>
		</form>
	</Dialog>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { useUserStore } from "../stores/user.js"
import { useRoute, useRouter } from "vue-router"
import { getUserById, updateUser } from "../requests/user.js"
import { uploadFile } from "../requests/file.js"
import { getSubscriptions, getSubscribers, subscribe, unsubscribe } from "../requests/subscriber.js"
import { getAllPosts, createPost } from "../requests/post.js"
import { getDialogIdByMembers, getChatById, createChat } from "../requests/chat.js"
import Dialog from "../ui/Dialog.vue"
import Input from "../ui/Input.vue"
import Post from "./Post.vue"
import Button from "../ui/Button.vue"
import File from "../icons/File.vue"

const router = useRouter()
const route = useRoute()
const store = useUserStore()

const dialogId = ref(null)
const isMyProfile = ref(false)
const user = ref({})
const subscribers = ref({})
const subscriptions = ref({})
const posts = ref([])
const dialog = ref(false)
const title = ref("")
let fileIds = []

const uploadFileHandler = event => {
	uploadFile(event.target.files[0])
		.then(({ data }) => {
			fileIds.push(data.id)
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const createPostHandler = () => {
	createPost(title.value, fileIds)
		.then(({ data }) => {
			posts.value.unshift(data)
			fileIds = []
			title.value = ""
			dialog.value = false
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const updateAvatar = event => {
	uploadFile(event.target.files[0])
		.then(({ data }) => {
			updateUserHandler(data.id, user.value.profileImageId)
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const updateProfileImage = event => {
	uploadFile(event.target.files[0])
		.then(({ data }) => {
			updateUserHandler(user.value.avatarId, data.id)
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const updateUserHandler = (avatarId, profileImageId) => {
	updateUser(user.value.id, avatarId, profileImageId)
		.then(({ data }) => {
			user.value = data
			store.identify(data)
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const getSubscribersHandler = () => {
	getSubscribers(user.value.id, 3, 0)
		.then(({ data }) => {
			subscribers.value = data
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const getSubscriptionsHandler = () => {
	getSubscriptions(user.value.id, 3, 0)
		.then(({ data }) => {
			subscriptions.value = data
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const subscribeHandler = () => {
	subscribe(user.value.id)
		.then(({ data }) => {
			subscribers.value = data
		})
}

const unsubscribeHandler = () => {
	unsubscribe(+user.value.id)
		.then(({ data }) => {
			subscribers.value = data
		})
}

const getAllPostsHandler = userId => {
	getAllPosts(userId, 10, 0)
		.then(({ data }) => {
			posts.value = data
		})
		.catch(({ message }) => {
			console.log(message)
		})
}

const getAvatar = computed(() => {
	return user.value.avatarId ? `http://localhost:80/files/${user.value.avatarId}` :
		`${import.meta.env.VITE_URL}/src/images/avatar.jpg`
})

const getCover = computed(() => {
	return user.value.profileImageId ? `http://localhost:80/files/${user.value.profileImageId}` :
		`${import.meta.env.VITE_URL}/src/images/cover.jpg`
})

const getUserByIdHandler = id => {
	if (+id === store.user.id) {
		user.value = store.user
		isMyProfile.value = true
		getSubscribersHandler()
		getSubscriptionsHandler()
		getAllPostsHandler(+id)
	} else {
		getUserById(+id)
			.then(({ data }) => {
				user.value = data
				getSubscribersHandler()
				getSubscriptionsHandler()
				getAllPostsHandler(+id)
			})
			.catch(({ message }) => {
				console.log(message)
			})
	}
}

const startDialogueHandler = () => {
	if (!dialogId.value) {
		createChat([+route.params.id])
			.then(({ data }) => {
				dialogId.value = data.id
				router.push(`/chat/${data.id}`)
			}).catch(resp => {
			console.log(resp)
		})
		return
	}
	router.push(`/chat/${dialogId.value}`)
}

const getDialogId = id => {
	getDialogIdByMembers(id)
		.then(({ data }) => {
			dialogId.value = data.id
		})
		.catch(({ response }) => {
			if (response.status === 404) {
				dialogId.value = null
			}
		})
}

onMounted(() => {
	getUserByIdHandler(route.params.id)
	getDialogId(route.params.id)
})

watch(route, (from, to) => {
	getUserByIdHandler(to.params.id)
	getDialogId(to.params.id)
})

</script>
