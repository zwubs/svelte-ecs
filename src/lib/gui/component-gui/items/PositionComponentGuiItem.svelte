<script lang="ts">
	import PositionIcon from 'virtual:icons/lucide/locate-fixed';
	import ComponentGuiItem from '../ComponentGuiItem.svelte';
	import type { PositionComponent } from '../../../ecs/components.svelte';
	import type { Canvas } from '../../../ecs/canvas.svelte';

	type Props = { position: PositionComponent; canvas: Canvas };
	let { position, canvas } = $props<Props>();
</script>

<ComponentGuiItem title="Position" icon={PositionIcon}>
	<div class="grid grid-cols-[auto_1fr] gap-2 items-center max-h-8">
		<span>X</span>
		<span class="text-right text-xs">{position.x} / {canvas.width}px</span>
	</div>
	<input type="range" bind:value={position.x} max={canvas.width} />
	<div class="grid grid-cols-[auto_1fr] gap-2 items-center max-h-8">
		<span>Y</span>
		<span class="text-right text-xs">{position.y} / {canvas.height}px</span>
	</div>
	<input type="range" bind:value={position.y} max={canvas.height} />
</ComponentGuiItem>
