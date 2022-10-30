<style lang="scss" scoped>
.card {
	padding: 10px 30px;
	background-color: #ffffff;
	border-radius: 10px;
	display: flex;
	column-gap: 30px;
	cursor: pointer;

	&__image {
		width: 40px;
		height: 40px;
		border-radius: 10px;
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
	<div
		class="card"
		@click="$router.push(`/profile/${props.user.id}`)"
	>
		<img
			class="card__image"
			:src="getAvatar"
		/>

		<div class="card__content">
			<span class="card__username">{{ user.username }}</span>
			<span
				class="card__date"
				v-if="date"
			>{{ formatDate(date) }}</span>
		</div>
		<h3
			class="card__title"
			v-if="title"
		>{{ title }}</h3>
	</div>
</template>

<script setup>
import { computed, defineProps } from "vue"
import { formatDate } from "../hooks/formatDate.js"

const props = defineProps({
	user: {
		type: Object,
		required: true
	},
	date: {
		type: String,
		default: null
	},
	title: {
		type: String,
		default: null
	}
})

const getAvatar = computed(() =>
	props.user.avatarId ? `http://localhost:80/files/${props.user.avatarId}` :
		`${import.meta.env.VITE_URL}/src/images/avatar.jpg`
)

</script>
