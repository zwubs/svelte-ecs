<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton';
	import {
		BounceComponent,
		ColorComponent,
		PositionComponent,
		RandomizeColorOnBounceComponent,
		RotationComponent,
		RotationalVelocityComponent,
		ScoreComponent,
		SizeComponent,
		VelocityComponent
	} from '../ecs/components.svelte';
	import PositionComponentGuiItem from './components/PositionComponentGuiItem.svelte';
	import VelocityComponentGuiItem from './components/VelocityComponentGuiItem.svelte';
	import ColorComponentGuiItem from './components/ColorComponentGuiItem.svelte';
	import RotationComponentGuiItem from './components/RotationComponentGuiItem.svelte';
	import ComponentIcon from 'virtual:icons/lucide/shapes';
	import SizeComponentGuiItem from './components/SizeComponentGuiItem.svelte';
	import type { Canvas } from '../ecs/canvas.svelte';
	import GuiAddComponent from './GuiAddComponent.svelte';
	import GuiDeleteComponent from './GuiDeleteComponent.svelte';
	import Draggable from '../components/Draggable.svelte';
	import ScoreComponentGuiItem from './components/ScoreComponentGuiItem.svelte';
	import type { Entity } from '../ecs/entity.svelte';
	import { HiddenComponent } from '../ecs/component.svelte';
	import EmptyGuiItem from './EmptyGuiItem.svelte';
	import RandomizeColorOnBounceIcon from 'virtual:icons/lucide/swatch-book';
	import BounceIcon from 'virtual:icons/lucide/arrow-up-from-line';
	import RotationalComponentGuiItem from './components/RotationalComponentGuiItem.svelte';

	type Props = { entity: Entity; canvas: Canvas };
	let { entity, canvas } = $props<Props>();

	let card = $state<HTMLElement>();
</script>

<div class="card absolute m-4 w-full max-w-md flex flex-col variant-ghost-surface max-h-[90vh]" style="right: 0px; top: 0px;" bind:this={card}>
	<header class="flex flex-row items-center gap-2 p-4">
		<hgroup class="flex-1">
			<h1 class="h4 font-bold flex gap-2"><ComponentIcon width="1.5rem" height="1.5rem" /><span>Components</span></h1>
			<p class="text-surface-100 text-sm">Data currently attached to the entity.</p>
		</hgroup>
		<Draggable element={card} />
	</header>
	<hr />
	<Accordion spacing="space-y-2 overflow-y-auto p-4">
		{#each entity.components as component}
			{#if !(component instanceof HiddenComponent)}
				<div class="flex flex-row items-center gap-4">
					{#if component instanceof PositionComponent}
						<PositionComponentGuiItem position={component} {canvas} />
					{:else if component instanceof VelocityComponent}
						<VelocityComponentGuiItem velocity={component} />
					{:else if component instanceof RotationComponent}
						<RotationComponentGuiItem rotation={component} />
					{:else if component instanceof ColorComponent}
						<ColorComponentGuiItem color={component} />
					{:else if component instanceof BounceComponent}
						<EmptyGuiItem title="Bounce" icon={BounceIcon} />
					{:else if component instanceof SizeComponent}
						<SizeComponentGuiItem size={component} />
					{:else if component instanceof ScoreComponent}
						<ScoreComponentGuiItem score={component} />
					{:else if component instanceof RandomizeColorOnBounceComponent}
						<EmptyGuiItem title="Randomize Color On Bounce" icon={RandomizeColorOnBounceIcon} />
					{:else if component instanceof RotationalVelocityComponent}
						<RotationalComponentGuiItem rotationalVelocity={component} />
					{/if}
					<GuiDeleteComponent bind:entity {component} />
				</div>
			{/if}
		{/each}
	</Accordion>
	<hr />
	<footer class="flex flex-row items-center gap-4 p-4">
		<GuiAddComponent bind:entity />
	</footer>
</div>

<style>
	#color {
		height: 100%;
	}
</style>
