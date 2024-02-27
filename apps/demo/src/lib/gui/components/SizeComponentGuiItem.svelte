<script lang="ts">
	import SizeIcon from 'virtual:icons/lucide/expand';
	import GuiItem from '../GuiItem.svelte';
	import type { SizeComponent } from '../../ecs/components.svelte';

	type Props = { size: SizeComponent };
	let { size } = $props<Props>();
</script>

<GuiItem title="Size" icon={SizeIcon}>
	<div class="grid grid-cols-[auto_1fr] gap-2 items-center max-h-8">
		<span>Size</span>
		<span class="text-right text-xs">{size.size}px / 100px</span>
	</div>
	<input type="range" bind:value={size.size} min="1" max="100" />
</GuiItem>
