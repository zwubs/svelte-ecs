<script lang="ts">
	import { ColorComponent, PositionComponent, SizeComponent, VelocityComponent } from '$lib/ecs/components.svelte';
	import { createEntity } from '$lib/ecs/entity.svelte';
	import Gui from '$lib/gui/Gui.svelte';
	import Canvas from '$lib/ecs/components/Canvas.svelte';
	import { createUpdater } from '../lib/ecs/updater.svelte';
	import RenderSystem from '../lib/ecs/systems/RenderSystem.svelte';
	import VelocitySystem from '../lib/ecs/systems/VelocitySystem.svelte';
	import EdgeCollisionSystem from '../lib/ecs/systems/EdgeCollisionSystem.svelte';
	import EdgeBounceSystem from '../lib/ecs/systems/EdgeBounceSystem.svelte';
	import ScoreOnBounceSystem from '../lib/ecs/systems/ScoreOnBounceSystem.svelte';
	import RandomizeColorOnBounceSystem from '../lib/ecs/systems/RandomizeColorOnBounceSystem.svelte';
	import RotationalVelocitySystem from '../lib/ecs/systems/RotationalVelocitySystem.svelte';

	let entity = $state(createEntity([new PositionComponent(), new VelocityComponent(), new ColorComponent(), new SizeComponent()]));
	let entities = $derived(new Set([entity]));

	const updater = createUpdater();
</script>

<Canvas let:canvas>
	{#if !!canvas}
		<Gui bind:entity {canvas} />
		<VelocitySystem {updater} {entities} />
		<RotationalVelocitySystem {updater} {entities} />
		<EdgeBounceSystem {canvas} {updater} {entities} />
		<EdgeCollisionSystem {canvas} {updater} {entities} />
		<ScoreOnBounceSystem {updater} {entities} />
		<RandomizeColorOnBounceSystem {updater} {entities} />
		<RenderSystem {canvas} {updater} {entities} />
	{/if}
</Canvas>

<style>
	:global(body),
	:global(html) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
</style>
