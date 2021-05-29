<template>
	<div class="current-user">
		<slot :user="user"></slot>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "currentUser",

	computed: {
		...mapGetters({
			user: "authUser",
		}),
	},
}
</script>

<style></style>
