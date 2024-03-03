<script lang="ts">
	import '../app.postcss';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
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
