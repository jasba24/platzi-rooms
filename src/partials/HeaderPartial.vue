<template>
	<header class="bg-white py-5 shadow">
		<div class="container">
			<div class="flex items-center justify-between flex-wrap">
				<div class="flex items-center flex-no-shrink mr-6">
					<router-link
						class="text-black hover:text-grey-darkest no-underline font-semibold text-lg"
						:to="{ name: 'HomePage' }"
					>
						Platzi Rooms
					</router-link>
				</div>
				<div class="flex items-center w-auto">
					<div class="items__controls">
						<CurrentUser>
							<template v-slot="{ user }">
								<div class="flex" v-if="user">
									<router-link
										tag="button"
										class="mr-2 flex items-center"
										:to="{ name: 'CreateHousePage' }"
									>
										<font-awesome-icon icon="plus" class="text-black" />
									</router-link>
									<button class="mr-4 flex items-center">
										<font-awesome-icon icon="bell" />
									</button>
									<div class="flex items-center">
										<img
											class="w-8 h-8 rounded-full mr-2"
											src="https://avatars2.githubusercontent.com/u/1901273?s=460&v=4"
											alt="Avatar of Javier Diaz"
										/>
										<div class="text-sm">
											<router-link
												:to="{ name: 'ProfilePage' }"
												class="no-underline"
											>
												<p class="text-black leading-none">{{ user.name }}</p>
											</router-link>
											<p class="text-grey-dark">Online</p>
										</div>
									</div>
									<button
										class="flex items-center ml-4"
										@click.prevent="logOut"
									>
										<font-awesome-icon icon="power-off" />
									</button>
								</div>
								<div v-else>
									<button
										class="btn__outline btn__outline--teal rounded mr-2"
										@click.prevent="openModal('login')"
									>
										Login
									</button>
									<button
										class="bg-yellow-dark text-yellow-darker font-semibold py-2 px-4 rounded"
										@click.prevent="openModal('register')"
									>
										Register
									</button>
								</div>
							</template>
						</CurrentUser>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import { mapGetters } from "vuex"
import CurrentUser from "../components/CurrentUser.vue"

export default {
	name: "HeaderPartial",

	components: { CurrentUser },

	data() {
		return {
			isAuthenticated: true,
		}
	},

	methods: {
		openModal(name) {
			this.$store.dispatch("TOOGLE_MODAL_STATE", {
				name,
				value: true,
			})
		},
		logOut() {
			this.$store.dispatch("LOG_OUT")
		},
	},
}
</script>
