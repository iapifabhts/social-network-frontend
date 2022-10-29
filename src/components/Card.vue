<style lang="scss" scoped>
.card {
	padding: 30px;
	background-color: #ffffff;
	border-radius: 10px;
	display: flex;
	column-gap: 10px;
	cursor: pointer;

	&__image {
		width: 40px;
		height: 40px;
		border-radius: 10px;
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

		{{ props.user.username }}
	</div>
</template>

<script setup>
import { computed, defineProps } from "vue"

const props = defineProps({
	user: {
		type: Object,
		required: true
	}
})

const getAvatar = computed(() =>
	props.user.avatarId ? `http://localhost:80/files/${props.user.avatarId}` :
		`${import.meta.env.VITE_URL}/src/images/avatar.jpg`
)

</script>
