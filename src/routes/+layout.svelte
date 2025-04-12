<script lang="ts">
	import { initializeDrawerStore } from '$lib/drawer';
	import '../app.postcss';

	initializeDrawerStore();
</script>

<slot />

<style>
	:global(body),
	:global(html) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
</style>
