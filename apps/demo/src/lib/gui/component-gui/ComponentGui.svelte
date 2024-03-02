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
	} from '../../ecs/components.svelte';
	import PositionComponentGuiItem from './items/PositionComponentGuiItem.svelte';
	import VelocityComponentGuiItem from './items/VelocityComponentGuiItem.svelte';
	import ColorComponentGuiItem from './items/ColorComponentGuiItem.svelte';
	import RotationComponentGuiItem from './items/RotationComponentGuiItem.svelte';
	import ComponentIcon from 'virtual:icons/lucide/shapes';
	import SizeComponentGuiItem from './items/SizeComponentGuiItem.svelte';
	import type { Canvas } from '../../ecs/canvas.svelte';
	import GuiAddComponent from './ComponentGuiAdd.svelte';
	import GuiDeleteComponent from './ComponentGuiDelete.svelte';
	import ScoreComponentGuiItem from './items/ScoreComponentGuiItem.svelte';
	import type { Entity } from '../../ecs/entity.svelte';
	import { HiddenComponent } from '../../ecs/component.svelte';
	import EmptyGuiItem from './items/EmptyComponentGuiItem.svelte';
	import RandomizeColorOnBounceIcon from 'virtual:icons/lucide/swatch-book';
	import BounceIcon from 'virtual:icons/lucide/arrow-up-from-line';
	import RotationalComponentGuiItem from './items/RotationalComponentGuiItem.svelte';

	type Props = { entity: Entity; canvas: Canvas };
	let { entity, canvas } = $props<Props>();

	let card = $state<HTMLElement>();
</script>

<div class="card w-full flex flex-col variant-ghost-surface max-h-[90vh]" bind:this={card}>
	<hgroup class="p-4">
		<h1 class="h4 font-bold flex gap-2">
			<ComponentIcon width="1.5rem" height="1.5rem" /><span>Components</span>
		</h1>
		<p class="text-surface-100 text-sm">Data currently attached to the entity.</p>
	</hgroup>
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
