<script lang="ts">
	import {
		ColorComponent,
		PositionComponent,
		SizeComponent,
		VelocityComponent
	} from './components.svelte';
	import * as Components from './components.svelte';
	import { Entity } from '$lib/ecs/entity.svelte';
	import GuiDrawer from '$lib/gui/GuiDrawer.svelte';
	import Globals from '$lib/ecs/globals/Globals.svelte';
	import { createUpdater } from '$lib/ecs/updater.svelte';
	import RenderSystem from './systems/RenderSystem.svelte';
	import VelocitySystem from './systems/VelocitySystem.svelte';
	import EdgeCollisionSystem from './systems/EdgeCollisionSystem.svelte';
	import EdgeBounceSystem from './systems/EdgeBounceSystem.svelte';
	import ScoreOnBounceSystem from './systems/ScoreOnBounceSystem.svelte';
	import RandomizeColorOnBounceSystem from './systems/RandomizeColorOnBounceSystem.svelte';
	import RotationalVelocitySystem from './systems/RotationalVelocitySystem.svelte';

	let entity = new Entity([
		new PositionComponent(),
		new VelocityComponent(),
		new ColorComponent(),
		new SizeComponent()
	]);

	let entities = new Set([entity]);

	const updater = createUpdater();

	const components = Object.values(Components);
</script>

<Globals>
	<!-- <GuiDrawer {canvas} bind:entities />
	<VelocitySystem {updater} {entities} />
	<RotationalVelocitySystem {updater} {entities} />
	<EdgeBounceSystem {canvas} {updater} {entities} />
	<EdgeCollisionSystem {canvas} {updater} {entities} />
	<ScoreOnBounceSystem {updater} {entities} />
	<RandomizeColorOnBounceSystem {updater} {entities} />
	<RenderSystem {canvas} {updater} {entities} /> -->
</Globals>
