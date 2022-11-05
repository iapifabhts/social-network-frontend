<style lang="scss" scoped>
.chat {
	display: flex;
	flex-direction: column;
	row-gap: 10px;

	&__header {
		display: flex;
		column-gap: 10px;
		padding: 10px 30px;
		border-radius: 10px;
		background-color: #ffffff;
	}

	&__avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	&__footer {
		display: grid;
		grid-template-columns: 70% 30%;
		grid-column-gap: 10px;
	}

	&__content {
		display: flex;
		flex-direction: column;
		height: 50vh;
		row-gap: 10px;
		overflow-y: scroll;
		padding: 0 10px;
	}

	&__footer {
		margin-top: auto;
	}
}

.content {
	&__message {
		padding: 10px 30px;
		border-radius: 10px;
		background-color: #ffffff;
		align-self: flex-start;

		&--my {
			background-color: #72b2e4;
			color: #ffffff;
			align-self: flex-end;
		}
	}
}
</style>

<template>
	<div class="chat">
		<header class="chat__header">
			<img
				class="header__avatar chat__avatar"
				:src="getAvatar(chat.avatarId)"
			/>
			<span class="header__name">{{ chat.name }}</span>
		</header>
		<TransitionGroup tag="div" class="chat__content">
			<div
				class="content__message"
				:class="{
					'content__message--my': store.user.id === msg.sender.id,
				}"
				v-for="msg in messages"
				:key="msg.dateOfCreation"
			>{{ msg.body }}</div>
		</TransitionGroup>
		<footer class="chat__footer">
			<Input v-model="message" placeholder="Message" />
			<Button @click="sendMessage()">Send</Button>
		</footer>
	</div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { getChatById, connect, getAllMessages } from "../requests/chat.js"
import { getAvatar } from "../hooks/getAvatar.js"
import { useUserStore } from "../stores/user.js"
import Input from "../ui/Input.vue"
import Button from "../ui/Button.vue"

const route = useRoute()
const store = useUserStore()

const messages = ref([])
const message = ref("")
const chat = ref({})
const conn = ref({})

const sendMessage = () => {
	conn.value.send(JSON.stringify({
		type: "text",
		body: message.value,
	}))

	message.value = ""
}

const getChatByIdHandler = id =>
	getChatById(+id)
		.then(({ data }) => chat.value = data)
		.catch(({ response }) => console.log(response.data.error))

const connectHandler = id => {
	conn.value = connect(id)
	conn.value.onopen = () => {
		conn.value.onmessage = ({ data }) => {
			messages.value.push(JSON.parse(data))
		}
	}
}

const getAllMessagesHandler = chatId =>
	getAllMessages(chatId)
		.then(({ data }) => {
			messages.value = data
		})

onMounted(() => {
	getChatByIdHandler(route.params.id)
	connectHandler(route.params.id)
	getAllMessagesHandler(route.params.id)
})

watch(route, (from, to) => {
	getChatByIdHandler(to.params.id)
	connectHandler(to.params.id)
	getAllMessagesHandler(to.params.id)
})

</script>
