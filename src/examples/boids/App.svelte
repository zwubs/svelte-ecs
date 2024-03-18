<script lang="ts">
	import {
		BoidComponent,
		KillCountComponent,
		PositionComponent,
		VelocityComponent,
		PlayerComponent,
		ChaseMouseComponent
	} from './components.svelte';
	import { type Entity, createEntity } from '$lib/ecs/entity.svelte';
	import Canvas from '$lib/ecs/components/Canvas.svelte';
	import { createUpdater } from '$lib/ecs/updater.svelte';
	import RenderSystem from './systems/RenderSystem.svelte';
	import VelocitySystem from './systems/VelocitySystem.svelte';
	import BoidSystem from './systems/boids/BoidSystem.svelte';
	import EdgeDeterentSystem from './systems/boids/BoidEdgeDeterentSystem.svelte';
	import MinMaxSpeedSystem from './systems/boids/BoidMinMaxSpeedSystem.svelte';
	import Mouse from '$lib/ecs/components/Mouse.svelte';
	import ChaseMouseSystem from './systems/ChaseMouseSystem.svelte';
	import AvoidPlayerSystem from './systems/player/AvoidPlayerSystem.svelte';
	import KillBoidsWithinTrackerRangeSystem from './systems/player/KillBoidsWithinPlayerRangeSystem.svelte';
	import RenderBoidSystem from './systems/boids/BoidRenderSystem.svelte';
	import RenderPlayerSystem from './systems/player/PlayerRenderSystem.svelte';
	import PlayerMinMaxSpeedSystem from './systems/player/PlayerMinMaxSpeedSystem.svelte';

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
			new PlayerComponent(),
			new ChaseMouseComponent(0.3),
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
			<AvoidPlayerSystem {updater} {entities} />
			<KillBoidsWithinTrackerRangeSystem {updater} {entities} />
			<MinMaxSpeedSystem {updater} {entities} />
			<PlayerMinMaxSpeedSystem {updater} {entities} />
			<VelocitySystem {updater} {entities} />
			<RenderSystem {canvas} {updater} />
			<RenderBoidSystem {canvas} {updater} {entities} />
			<RenderPlayerSystem {canvas} {updater} {entities} />

			<div class="absolute right-0 top-0 m-4 text-right">
				<div>Kill Count: {killCount.kills}</div>
				<div>Boids Alive: {entities.size - 1}</div>
			</div>
		</Mouse>
	{/if}
</Canvas>
