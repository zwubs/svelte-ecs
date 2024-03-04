<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Entity } from '../ecs/entity.svelte';
	import type { Canvas } from '../ecs/canvas.svelte';
	import ComponentGuiSection from './component-gui/ComponentGuiSection.svelte';
	import EntityGuiSection from './entity-gui/EntityGuiSection.svelte';
	import MenuIcon from 'virtual:icons/lucide/menu';
	import { Accordion, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import SystemGuiSection from './system-gui/SystemGuiSection.svelte';

	type GuiDrawerProps = { entities: Set<Entity>; canvas: Canvas };
	let { entities, canvas } = $props<GuiDrawerProps>();

	let entity = $state(new Entity());

	const drawerStore = getDrawerStore();
	drawerStore.open();
</script>

{#if !$drawerStore.open}
	<button
		type="button"
		class="btn-icon variant-ghost absolute right-0 top-0 m-4"
		transition:fade={{ duration: 250 }}
		on:click={() => drawerStore.open()}
	>
		<MenuIcon />
	</button>
{/if}

<Drawer
	position="right"
	duration={500}
	width="w-auto"
	height="h-min max-h-full"
	bgDrawer="bg-transparent"
	bgBackdrop="bg-transparent"
	shadow="shadow-none"
>
	<Accordion width="w-[28rem]" class="flex flex-col gap-4 p-4 max-w-md">
		<EntityGuiSection {entities} bind:entity />
		<ComponentGuiSection bind:entity {canvas} />
		<SystemGuiSection />
	</Accordion>
</Drawer>
