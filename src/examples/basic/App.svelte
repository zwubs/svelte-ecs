<script lang="ts">
	import {
		ColorComponent,
		PositionComponent,
		SizeComponent,
		VelocityComponent
	} from './components.svelte';
	import * as Components from './components.svelte';
	import { createEntity } from '$lib/ecs/entity.svelte';
	import GuiDrawer from '$lib/gui/GuiDrawer.svelte';
	import Canvas from '$lib/ecs/components/Canvas.svelte';
	import { createUpdater } from '$lib/ecs/updater.svelte';
	import RenderSystem from './systems/RenderSystem.svelte';
	import VelocitySystem from './systems/VelocitySystem.svelte';
	import EdgeCollisionSystem from './systems/EdgeCollisionSystem.svelte';
	import EdgeBounceSystem from './systems/EdgeBounceSystem.svelte';
	import ScoreOnBounceSystem from './systems/ScoreOnBounceSystem.svelte';
	import RandomizeColorOnBounceSystem from './systems/RandomizeColorOnBounceSystem.svelte';
	import RotationalVelocitySystem from './systems/RotationalVelocitySystem.svelte';

	let entity = $state(
		createEntity([
			new PositionComponent(),
			new VelocityComponent(),
			new ColorComponent(),
			new SizeComponent()
		])
	);
	let entities = $derived(new Set([entity]));

	const updater = createUpdater();

	const components = Object.values(Components);
</script>

<Canvas let:canvas>
	{#if !!canvas}
		<GuiDrawer {canvas} {entities} {components} bind:entity />
		<VelocitySystem {updater} {entities} />
		<RotationalVelocitySystem {updater} {entities} />
		<EdgeBounceSystem {canvas} {updater} {entities} />
		<EdgeCollisionSystem {canvas} {updater} {entities} />
		<ScoreOnBounceSystem {updater} {entities} />
		<RandomizeColorOnBounceSystem {updater} {entities} />
		<RenderSystem {canvas} {updater} {entities} />
	{/if}
</Canvas>
