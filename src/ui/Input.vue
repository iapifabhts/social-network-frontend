<style lang="scss">
.container {
	display: flex;
	flex-direction: column;
	row-gap: 5px;

	&__label {
		font-size: 15px;
		font-weight: 500;
	}

	&__input {
		font-size: 15px;
		border: none;
		border-radius: 10px;
		padding: 10px;
		transition: box-shadow .25s;

		&:hover,
		&:focus {
			box-shadow: 0 0 0 5px rgba(#72b2e4, .2);
		}

		&:focus {
			outline: none;
		}
	}
}
</style>

<template>
	<div class="container">
		<label
			v-if="label"
			class="container__label"
			for="input"
		>{{ label }}</label>
		<input
			:placeholder="placeholder"
			class="container__input"
			:type="type"
			id="input"
			:value="modelValue"
			@input="$emit(`update:modelValue`, $event.target.value)"
		/>
	</div>
</template>

<script setup>
defineProps({
	modelValue: {
		type: String,
		required: true
	},
	label: {
		type: String,
		default: null
	},
	type: {
		type: String,
		default: "text"
	},
	placeholder: {
		type: String,
		default: null
	}
})

</script>
