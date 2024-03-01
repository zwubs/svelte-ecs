<script lang="ts">
	import '../app.postcss';

	import {
		BoidComponent,
		KillCountComponent,
		PositionComponent,
		TrackMouseComponent,
		VelocityComponent
	} from '$lib/ecs/components.svelte';
	import { createEntity, type Entity } from '$lib/ecs/entity.svelte';
	import Canvas from '$lib/ecs/components/Canvas.svelte';
	import { createUpdater } from '../lib/ecs/updater.svelte';
	import RenderSystem from '../lib/ecs/systems/RenderSystem.svelte';
	import VelocitySystem from '../lib/ecs/systems/VelocitySystem.svelte';
	import BoidSystem from '../lib/ecs/systems/BoidSystem.svelte';
	import EdgeDeterentSystem from '../lib/ecs/systems/EdgeDeterentSystem.svelte';
	import MinMaxSpeedSystem from '../lib/ecs/systems/MinMaxSpeedSystem.svelte';
	import Mouse from '../lib/ecs/components/Mouse.svelte';
	import TrackMouseSystem from '../lib/ecs/systems/TrackMouseSystem.svelte';
	import AvoidTrackerSystem from '../lib/ecs/systems/AvoidTrackerSystem.svelte';
	import KillBoidsWithinTrackerRangeSystem from '../lib/ecs/systems/KillBoidsWithinTrackerRangeSystem.svelte';

	const boids: Entity[] = [];
	for (let i = 0; i < 100; i++) {
		let entity = createEntity([
			new BoidComponent(),
			new PositionComponent(),
			new VelocityComponent()
		]);
		const position = entity.componentsByConstructor.get(PositionComponent) as PositionComponent;
		position.x = Math.floor(Math.random() * 1000);
		position.y = Math.floor(Math.random() * 1000);
		const velocity = entity.componentsByConstructor.get(VelocityComponent) as VelocityComponent;
		velocity.x = Math.floor(Math.random() * 30 - 15);
		velocity.y = Math.floor(Math.random() * 30 - 15);
		boids.push(entity);
	}

	const killCount = new KillCountComponent();

	boids.push(
		createEntity([
			new BoidComponent(),
			new PositionComponent(),
			new VelocityComponent(),
			new TrackMouseComponent(),
			killCount
		])
	);

	let entities = new Set(boids);

	const updater = createUpdater();
</script>

<Canvas let:canvas>
	{#if !!canvas}
		<Mouse let:mouse>
			<TrackMouseSystem {mouse} {updater} {entities} />
			<BoidSystem {updater} {entities} />
			<EdgeDeterentSystem {canvas} {updater} {entities} />
			<AvoidTrackerSystem {updater} {entities} />
			<KillBoidsWithinTrackerRangeSystem {updater} {entities} />
			<MinMaxSpeedSystem {updater} {entities} />
			<VelocitySystem {updater} {entities} />
			<RenderSystem {canvas} {updater} {entities} />

			<div class="absolute right-0 top-0 m-4 text-right">
				<div>Kill Count: {killCount.kills}</div>
				<div>Boids Alive: {entities.size - 1}</div>
			</div>
		</Mouse>
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
