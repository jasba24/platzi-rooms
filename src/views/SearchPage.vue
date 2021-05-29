<template>
	<page-layout>
		<section class="py-4 bg-teal-dark">
			<div class="container">
				<form class="form">
					<div class="form__field relative">
						<font-awesome-icon
							class="absolute text-grey-darker input-icon"
							icon="search"
						/>
						<input
							class="input__search"
							id="where"
							type="text"
							placeholder="Mexico City, Mexico"
						/>
					</div>
				</form>
			</div>
		</section>
		<section class="section__items py-8">
			<div class="container">
				<h1 class="text-3xl font-light mb-3">Explore all</h1>
				<div class="search__content grid-container mb-8">
					<div
						class="house__card mb-3"
						v-for="room in rooms"
						:key="room['.key']"
					>
						<div class="house__thumbnail relative overflow-hidden">
							<img
								class="house__image absolute w-full"
								width="250"
								:src="room.featured_image"
							/>
						</div>
						<div class="house__content bg-white p-3 border rounded">
							<div
								class="house__type font-semibold text-xs uppercase text-teal-dark mb-1"
							>
								{{ room.type }}
							</div>
							<div class="house__title font-bold mb-2">
								{{ room.title }}
							</div>
							<div class="house__price text-xs">
								<span class="font-bold">${{ room.price }} MXN</span> per night
							</div>
							<div class="house__services text-xs mt-2">
								<h4 class=" text-teal-dark">Services</h4>
								<ul v-for="(room, i) in room.services" :key="i">
									<li>{{ $filters.getService(services, room) }}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</page-layout>
</template>

<script>
import { mapGetters } from "vuex"
import PageLayout from "@/layouts/PageLayout.vue"

export default {
	name: "SearchPage",

	components: {
		PageLayout,
	},

	created() {
		this.$store.dispatch("FETCH_ROOMS")
		this.$store.dispatch("FETCH_SERVICES")
	},

	computed: {
		...mapGetters(["rooms"]),
		...mapGetters(["services"]),
	},
}
</script>

<style>
.section__explore {
	grid-template-columns: repeat(4, 1fr);
}

.house__card > .house__thumbnail {
	height: 170px;
}

.house__thumbnail > .house__image {
	width: 100%;
	top: 50%;
	left: 50%;
	margin-right: -50%;
	transform: translate(-50%, -50%);
}

@media (max-width: 992px) {
	.house__card > .house__thumbnail {
		height: 150px;
	}
	.section__explore {
		grid-template-columns: repeat(3, 1fr);
	}
}

@media (max-width: 576px) {
	.section__explore {
		grid-template-columns: repeat(1, 1fr);
	}

	.house__card > .house__thumbnail {
		height: 120px;
	}
}
.section__items .grid-container {
	grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 992px) {
	.section__items .grid-container {
		grid-template-columns: repeat(3, 1fr);
	}
}

@media (max-width: 576px) {
	.section__items .grid-container {
		grid-template-columns: repeat(1, 1fr);
	}
}
</style>
