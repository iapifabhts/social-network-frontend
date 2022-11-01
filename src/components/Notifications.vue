<style lang="scss" scoped>
.notifications {
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	position: fixed;
	bottom: 10px;
	right: 30px;

	&__notification {
		width: 240px;
		border-radius: 10px;
		background-color: #72b2e4;
		color: #ffffff;
		padding: 10px;
		height: 70px;
		display: flex;
		align-items: center;
		column-gap: 10px;
	}

	&-enter-active,
	&-leave-active {
		transition: all .25s;
	}

	&-enter-from {
		opacity: 0;
		transform: translateY(30px);
	}

	&-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}
}

.notification {
	&__avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		cursor: pointer;
	}
}

</style>

<template>
	<TransitionGroup class="notifications" name="notifications" tag="div">
		<div
			class="notifications__notification"
			v-for="notification in store.notifications"
			:key="notification"
		>
			<img
				:src="getAvatar(notification.sender.avatarId)"
				class="notification__avatar"
				@click="$router.push(`/profile/${notification.sender.id}`)"
			/>
			<span class="notification__body">{{ notification.body }}</span>
		</div>
	</TransitionGroup>
</template>

<script setup>
import { useNotificationStore } from "../stores/notification.js"
import { getAvatar } from "../hooks/getAvatar.js"
import Profile from "../icons/Profile.vue";

const store = useNotificationStore()
</script>
