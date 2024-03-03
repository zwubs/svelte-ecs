<!-- Stolen with <3 from Threlte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const allAppModules = import.meta.glob('../../../examples/**/App.svelte') as Record<
		string,
		() => Promise<any>
	>;

	let mounted = false;

	const AppModule = Object.entries(allAppModules).find(
		([key]) => key === '../../../examples/' + data.example + '/App.svelte'
	)?.[1];

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted && AppModule}
	{#await AppModule() then Mod}
		<Mod.default />
	{/await}
{/if}
