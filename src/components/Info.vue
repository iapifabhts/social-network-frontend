<style lang="scss" scoped>
.info {
	border-radius: 10px;
	padding: 10px 30px;
	display: flex;
	column-gap: 10px;
	background-color: rgba(#000000, .7);

	&__avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		cursor: pointer;
	}
}
</style>

<template>
	<div class="info">
		<img
			@click="$router.push(`/profile/${user.creator?.id ?? user.id}`)"
			v-for="user in users"
			class="info__avatar"
			:src="getAvatar(user.creator?.avatarId ?? user.avatarId)"
		/>
	</div>
</template>

<script setup>
import { defineProps } from "vue"
import { getAvatar } from "../hooks/getAvatar.js"

const props = defineProps({
	users: {
		type: Array,
		required: true
	}
})

</script>
