<script lang="ts">
	import {
		AccelerationComponent,
		MassComponent,
		NameComponent,
		PerviousPositionsComponent,
		PositionComponent,
		VelocityComponent
	} from './components.svelte';
	import { createEntity, type Entity } from '$lib/ecs/entity.svelte';
	import Canvas from '$lib/ecs/components/Canvas.svelte';
	import { createUpdater } from '$lib/ecs/updater.svelte';
	import RenderSystem from './systems/RenderSystem.svelte';
	import VelocitySystem from './systems/VelocitySystem.svelte';
	import AccelerationSystem from './systems/AccelerationSystem.svelte';
	import NBodySystem from './systems/NBodySystem.svelte';
	import TrailSystem from './systems/TrailSystem.svelte';
	import RenderNameSystem from './systems/RenderNameSystem.svelte';

	const entityArray: Entity[] = [
		createEntity([
			new NameComponent('Sun'),
			new MassComponent(1),
			new PositionComponent(-1.50324727873647e-6, -3.93762725944737e-6, -4.86567877183925e-8),
			new VelocityComponent(3.1669325898331e-5, -6.85489559263319e-6, -7.90076642683254e-7),
			new AccelerationComponent(0, 0)
		]),
		createEntity([
			new NameComponent('Earth'),
			new MassComponent(3.0024584e-6),
			new PositionComponent(0.648778995445634, 0.747796691108466, 0.00951633403684172),
			new VelocityComponent(-4.85085525059392, 4.09601538682312, -1.01249478093275),
			new AccelerationComponent(0, 0),
			new PerviousPositionsComponent(40, 4)
		]),
		createEntity([
			new NameComponent('Mercury'),
			new MassComponent(1.65956463e-7),
			new PositionComponent(-0.346390408691506, -0.272465544507684, 0.0192761582256879),
			new VelocityComponent(4.25144321778261, -7.61778341043381, 0.391700036358566),
			new AccelerationComponent(0, 0),
			new PerviousPositionsComponent(20, 4)
		]),
		createEntity([
			new NameComponent('Venus'),
			new MassComponent(2.44699613e-6),
			new PositionComponent(-0.168003526072526, 0.698844725464528, -3.22953591923124e-5),
			new VelocityComponent(-7.2077847105093, -1.76778886124455, -0.000258553333317722),
			new AccelerationComponent(0, 0),
			new PerviousPositionsComponent(30, 4)
		]),
		createEntity([
			new NameComponent('Mars'),
			new MassComponent(3.213e-7),
			new PositionComponent(-0.574871406752105, -1.395455041953879, -0.01515164037265145),
			new VelocityComponent(4.9225288800471425, -1.5065904473191791, -0.1524041758922603),
			new AccelerationComponent(0, 0),
			new PerviousPositionsComponent(50, 4)
		])
	];

	let entities = new Set(entityArray);

	const updater = createUpdater();
</script>

<Canvas let:canvas>
	{#if !!canvas}
		<NBodySystem {updater} {entities} />
		<AccelerationSystem {updater} {entities} />
		<VelocitySystem {updater} {entities} />
		<RenderSystem {canvas} {updater} {entities} />
		<TrailSystem {canvas} {updater} {entities} />
		<RenderNameSystem {canvas} {updater} {entities} />
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
