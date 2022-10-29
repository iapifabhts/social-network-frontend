<style lang="scss" scoped>
.sidebar {
	width: 270px;
	height: 100vh;
	padding: 30px;
	display: flex;
	flex-direction: column;
	row-gap: 30px;
	background-color: inherit;

	&__profile,
	&__menu {
		background-color: #ffffff;
		border-radius: 10px;
	}

	&__profile {
		padding: 20px;
		display: flex;
		column-gap: 10px;
	}

	&__icon {
		width: 40px;
		height: 40px;
		border-radius: 10px;
	}

	&__menu {
		padding: 20px 0;
		display: flex;
		flex-direction: column;
	}

	&__link {
		padding: 10px;
		text-decoration: none;
		color: inherit;
	}

	&__content {
		display: flex;
		column-gap: 10px;
		align-items: center;
	}
}
</style>

<template>
	<aside class="sidebar">
		<div class="sidebar__profile">
			<img
				class="sidebar__icon"
				:src="getImage(store.user.avatarId)"
			/>
			{{ store.user.username }}
		</div>
		<div class="sidebar__menu">
			<router-link class="sidebar__link" :to="`/profile/${store.user.id}`">
				<span class="sidebar__content"><Profile />Profile</span>
			</router-link>
			<router-link class="sidebar__link" to="/feed">
				<span class="sidebar__content"><Feed />Feed</span>
			</router-link>
			<router-link class="sidebar__link" to="/people">
				<span class="sidebar__content"><People />People</span>
			</router-link>
		</div>
	</aside>
</template>

<script setup>
import { useUserStore } from "../stores/user.js"
import { useRoute } from "vue-router"
import Profile from "../icons/Profile.vue"
import Feed from "../icons/Feed.vue"
import People from "../icons/People.vue"

const store = useUserStore()
const route = useRoute()

const getImage = id => {
	return id ? `http://localhost:80/files/${id}` : `${import.meta.env.VITE_URL}/src/images/avatar.jpg`
}

</script>
