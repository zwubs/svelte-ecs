<script lang="ts">
	import VelocityIcon from 'virtual:icons/lucide/rabbit';
	import ComponentGuiItem from '../ComponentGuiItem.svelte';
	import type { VelocityComponent } from '../../../ecs/components.svelte';

	type Props = { velocity: VelocityComponent };
	let { velocity } = $props<Props>();
</script>

<ComponentGuiItem title="Velocity" icon={VelocityIcon}>
	<div class="grid grid-cols-[auto_1fr] gap-2 items-center max-h-8">
		<span>X</span>
		<span class="text-right text-xs">{velocity.x} / 10</span>
	</div>
	<input type="range" bind:value={velocity.x} min={-10} max={10} />
	<div class="grid grid-cols-[auto_1fr] gap-2 items-center max-h-8">
		<span>Y</span>
		<span class="text-right text-xs">{velocity.y} / 10</span>
	</div>
	<input type="range" bind:value={velocity.y} min={-10} max={10} />
</ComponentGuiItem>
