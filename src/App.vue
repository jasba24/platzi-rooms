<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	created() {
		if (this.$store.state.authId) {
			this.$store.dispatch("FETCH_USER", { id: this.$store.state.authId })
		}
	},
}
</script>

<style lang="postcss" src="./assets/tailwind.postcss"></style>
<style lang="css" src="./assets/main.css"></style>
