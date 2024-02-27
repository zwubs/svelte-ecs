<script lang="ts">
	import RotationIcon from 'virtual:icons/lucide/rotate-cw';
	import GuiItem from '../GuiItem.svelte';
	import type { RotationComponent } from '../../ecs/components.svelte';

	type Props = { rotation: RotationComponent };
	let { rotation } = $props<Props>();
</script>

<GuiItem title="Rotation" icon={RotationIcon}>
	<div class="grid grid-cols-[auto_1fr] gap-2 items-center max-h-8">
		<span>Degrees</span>
		<span class="text-right text-xs">{rotation.degrees}&deg; / 90&deg;</span>
	</div>
	<input type="range" bind:value={rotation.degrees} max="90" />
</GuiItem>
