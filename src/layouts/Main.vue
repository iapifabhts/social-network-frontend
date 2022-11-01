<style lang="scss" scoped>
.main {
	width: 100vw;
	height: 100vh;
	display: flex;

	&__container {
		width: calc(100vw - 270px);
		height: 100vh;
		padding: 30px 30px 60px;
		overflow-y: auto;
	}

	&__content {
		margin: 0 auto;
		max-width: 730px;
	}
}
</style>

<template>
	<div class="main">
		<Sidebar />
		<div class="main__container">
			<div class="main__content">
				<router-view />
			</div>
		</div>
	</div>
	<Notifications />
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue"
import Notifications from "../components/Notifications.vue"

</script>
