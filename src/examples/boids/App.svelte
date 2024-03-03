<script lang="ts">
	import {
		BoidComponent,
		KillCountComponent,
		PositionComponent,
		VelocityComponent,
		EnemyComponent,
		ChaseMouseComponent
	} from './components.svelte';
	import { createEntity, type Entity } from '$lib/ecs/entity.svelte';
	import Canvas from '$lib/ecs/components/Canvas.svelte';
	import { createUpdater } from '$lib/ecs/updater.svelte';
	import RenderSystem from './systems/RenderSystem.svelte';
	import VelocitySystem from './systems/VelocitySystem.svelte';
	import BoidSystem from './systems/BoidSystem.svelte';
	import EdgeDeterentSystem from './systems/EdgeDeterentSystem.svelte';
	import MinMaxSpeedSystem from './systems/MinMaxSpeedSystem.svelte';
	import Mouse from '$lib/ecs/components/Mouse.svelte';
	import ChaseMouseSystem from './systems/ChaseMouseSystem.svelte';
	import AvoidEnemySystem from './systems/AvoidEnemySystem.svelte';
	import KillBoidsWithinTrackerRangeSystem from './systems/KillBoidsWithinTrackerRangeSystem.svelte';
	import RenderBoidSystem from './systems/RenderBoidSystem.svelte';
	import RenderEnemySystem from './systems/RenderEnemySystem.svelte';

	const boids: Entity[] = [];
	for (let i = 0; i < 100; i++) {
		let entity = createEntity([
			new BoidComponent(),
			new PositionComponent(),
			new VelocityComponent()
		]);
		const position = entity.get(PositionComponent) as PositionComponent;
		position.x = Math.floor(Math.random() * 1000);
		position.y = Math.floor(Math.random() * 1000);
		const velocity = entity.get(VelocityComponent) as VelocityComponent;
		velocity.x = Math.floor(Math.random() * 30 - 15);
		velocity.y = Math.floor(Math.random() * 30 - 15);
		boids.push(entity);
	}

	const killCount = new KillCountComponent();

	boids.push(
		createEntity([
			new PositionComponent(),
			new VelocityComponent(),
			new EnemyComponent(),
			new ChaseMouseComponent(0.25),
			killCount
		])
	);

	let entities = new Set(boids);

	const updater = createUpdater();
</script>

<Canvas let:canvas>
	{#if !!canvas}
		<Mouse let:mouse {canvas}>
			<ChaseMouseSystem {mouse} {updater} {entities} />
			<BoidSystem {updater} {entities} />
			<EdgeDeterentSystem {canvas} {updater} {entities} />
			<AvoidEnemySystem {updater} {entities} />
			<KillBoidsWithinTrackerRangeSystem {updater} {entities} />
			<MinMaxSpeedSystem {updater} {entities} />
			<VelocitySystem {updater} {entities} />
			<RenderSystem {canvas} {updater} />
			<RenderBoidSystem {canvas} {updater} {entities} />
			<RenderEnemySystem {canvas} {updater} {entities} />

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
