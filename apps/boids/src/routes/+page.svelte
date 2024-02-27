<script lang="ts">
	import '../app.postcss';

	import { BoidBiasComponent, BoidComponent, BoidScoutGroupComponent, ColorComponent, PositionComponent, VelocityComponent } from '$lib/ecs/components.svelte';
	import { createEntity, type Entity } from '$lib/ecs/entity.svelte';
	import Canvas from '$lib/ecs/components/Canvas.svelte';
	import { createUpdater } from '../lib/ecs/updater.svelte';
	import RenderSystem from '../lib/ecs/systems/RenderSystem.svelte';
	import VelocitySystem from '../lib/ecs/systems/VelocitySystem.svelte';
	import BoidSystem from '../lib/ecs/systems/BoidSystem.svelte';
	import EdgeDeterentSystem from '../lib/ecs/systems/EdgeDeterentSystem.svelte';
	import MinMaxSpeedSystem from '../lib/ecs/systems/MinMaxSpeedSystem.svelte';
	import BoidBiasSystem from '../lib/ecs/systems/BoidBiasSystem.svelte';
	import DynamicBoidBiasSystem from '../lib/ecs/systems/DynamicBoidBiasSystem.svelte';

	const boids: Entity[] = [];
	for (let i = 0; i < 100; i++) {
		let entity = createEntity([new BoidComponent(), new PositionComponent(), new VelocityComponent()]);
		const position = entity.componentsByConstructor.get(PositionComponent) as PositionComponent;
		position.x = Math.floor(Math.random() * 1000);
		position.y = Math.floor(Math.random() * 1000);
		const velocity = entity.componentsByConstructor.get(VelocityComponent) as VelocityComponent;
		velocity.x = Math.floor(Math.random() * 30 - 15);
		velocity.y = Math.floor(Math.random() * 30 - 15);
		boids.push(entity);
	}

	let entities = new Set(boids);

	const updater = createUpdater();
</script>

<Canvas let:canvas>
	{#if !!canvas}
		<BoidSystem {updater} {entities} />
		<EdgeDeterentSystem {canvas} {updater} {entities} />
		<!-- <DynamicBoidBiasSystem {updater} {entities} /> -->
		<!-- <BoidBiasSystem {updater} {entities} /> -->
		<MinMaxSpeedSystem {updater} {entities} />
		<VelocitySystem {updater} {entities} />
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
