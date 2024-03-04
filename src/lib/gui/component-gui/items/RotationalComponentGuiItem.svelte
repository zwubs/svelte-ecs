<script lang="ts">
	import RotationalVelocityIcon from 'virtual:icons/lucide/refresh-cw';
	import ComponentGuiItem from '../ComponentGuiItem.svelte';
	import type { RotationalVelocityComponent } from '../../../ecs/components.svelte';

	type Props = { rotationalVelocity: RotationalVelocityComponent };
	let { rotationalVelocity } = $props<Props>();
</script>

<ComponentGuiItem title="Rotational Velocity" icon={RotationalVelocityIcon}>
	<div class="grid grid-cols-[auto_1fr] gap-2 items-center max-h-8">
		<span>Degrees Per Frame</span>
		<span class="text-right text-xs">{rotationalVelocity.degreesPerFrame}&deg; / 5&deg;</span>
	</div>
	<input type="range" bind:value={rotationalVelocity.degreesPerFrame} max="5" />
</ComponentGuiItem>
