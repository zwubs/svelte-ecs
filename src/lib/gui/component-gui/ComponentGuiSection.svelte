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
	import EmptyComponentGuiItem from './items/EmptyComponentGuiItem.svelte';
	import RandomizeColorOnBounceIcon from 'virtual:icons/lucide/swatch-book';
	import BounceIcon from 'virtual:icons/lucide/arrow-up-from-line';
	import UnknownIcon from 'virtual:icons/lucide/help-circle';
	import RotationalComponentGuiItem from './items/RotationalComponentGuiItem.svelte';
	import GuiSection from '../GuiSection.svelte';

	type Props = { entity: Entity; canvas: Canvas };
	let { entity, canvas } = $props<Props>();
</script>

<GuiSection
	icon={ComponentIcon}
	title="Components"
	description="Data currently attached to the entity."
>
	<Accordion spacing="space-y-2 p-4">
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
						<EmptyComponentGuiItem title="Bounce" icon={BounceIcon} />
					{:else if component instanceof SizeComponent}
						<SizeComponentGuiItem size={component} />
					{:else if component instanceof ScoreComponent}
						<ScoreComponentGuiItem score={component} />
					{:else if component instanceof RandomizeColorOnBounceComponent}
						<EmptyComponentGuiItem
							title="Randomize Color On Bounce"
							icon={RandomizeColorOnBounceIcon}
						/>
					{:else if component instanceof RotationalVelocityComponent}
						<RotationalComponentGuiItem rotationalVelocity={component} />
					{:else}
						<EmptyComponentGuiItem title={component.constructor.name} icon={UnknownIcon} />
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
</GuiSection>

<style>
	#color {
		height: 100%;
	}
</style>
