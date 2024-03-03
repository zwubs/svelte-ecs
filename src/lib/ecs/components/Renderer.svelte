<script lang="ts">
	import Canvas from './Canvas.svelte';

	let { canvas } = $props<{ canvas?: Canvas }>();
</script>

<div></div>

<slot />
