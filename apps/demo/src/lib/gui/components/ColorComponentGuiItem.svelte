<script lang="ts">
	import ColorIcon from 'virtual:icons/lucide/palette';
	import GuiItem from '../GuiItem.svelte';
	import type { ColorComponent } from '../../ecs/components.svelte';

	type Props = { color: ColorComponent };
	let { color } = $props<Props>();
</script>

<GuiItem title="Color" icon={ColorIcon}>
	<div class="grid grid-cols-[auto_1fr_auto] gap-2 items-center max-h-8">
		<span class="mr-4">Fill</span>
		<span class="text-right">{color.hex}</span>
		<input id="color" class="input" type="color" bind:value={color.hex} />
	</div>
</GuiItem>

<style>
	#color {
		height: 100%;
	}
</style>
