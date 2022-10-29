<style lang="scss" scoped>
.button {
	border-radius: 10px;
	padding: 10px;
	font-size: 15px;
	border: none;
	background-color: #72b2e4;
	color: #ffffff;
	cursor: pointer;
	transition: box-shadow .25s;
	font-weight: 500;

	&:hover {
		box-shadow: 0 0 0 5px rgba(#72b2e4, .2);
	}

	&:active {
		box-shadow: none;
	}
}
</style>

<template>
	<button class="button">
		<slot />
	</button>
</template>
