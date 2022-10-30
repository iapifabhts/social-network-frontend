<style lang="scss" scoped>
.dialog {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(#000000, .5);
	display: flex;
	align-items: center;
	justify-content: center;

	&__content {
		border-radius: 10px;
		background-color: rgba(#ffffff, .9);
		padding: 30px;
	}
}
</style>

<template>
	<div
		class="dialog"
		v-if="modelValue"
		@click="$emit(`update:modelValue`, false)"
	>
		<div class="dialog__content" @click.stop>
			<slot />
		</div>
	</div>
</template>

<script setup>
import { defineProps } from "vue"

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	}
})

</script>
