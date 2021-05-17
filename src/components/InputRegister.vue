<template>
	<form>
		<div class="mb-4">
			<label class="input__label">Name</label>
			<div class="form__field relative">
				<input class="input__field" type="text" placeholder="bruce wayne" />
			</div>
		</div>
		<div class="mb-4">
			<label class="input__label">Email</label>
			<div class="form__field relative">
				<input
					class="input__field"
					type="text"
					placeholder="bruce.wayne@imnobatman.org"
				/>
			</div>
		</div>
		<div class="mb-4">
			<label class="input__label">Password</label>
			<div class="form__field relative">
				<input
					class="input__field"
					type="password"
					placeholder="***************"
				/>
			</div>
		</div>
		<div class="mb-4">
			<button class="btn btn-primary mr-3 w-full">Login</button>
		</div>
	</form>
</template>

<script>
export default {
	name: "Input",
}
</script>
