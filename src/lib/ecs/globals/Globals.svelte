<script>
	import { getContext, onMount } from 'svelte';
	import Canvas from './Canvas.svelte';
	import Mouse from './Mouse.svelte';

	let globals = {};

	onMount(() => {
		console.log(getContext('canvas'));
	});
</script>

<Canvas let:canvas>
	{#if canvas}
		<Mouse {canvas} />
	{/if}
</Canvas>
