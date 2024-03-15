<script lang="ts">
	import PositionIcon from 'virtual:icons/lucide/locate-fixed';
	import ComponentGuiItem from '$lib/gui/component-gui/ComponentGuiItem.svelte';
	import type { VelocityComponent } from '../../components.svelte';
	import { SliderElement } from '$lib/gui/component-gui/elements';
	import Canvas from '$lib/ecs/globals/Canvas.svelte';

	type Props = { component: VelocityComponent; canvas: Canvas };
	let { component, canvas } = $props<Props>();
</script>

<ComponentGuiItem title="VelocityComponent" icon={PositionIcon}>
	<SliderElement name="X" value={component.x} max={canvas.width} unit="px" />
	<SliderElement name="Y" value={component.y} max={canvas.height} unit="px" />
</ComponentGuiItem>
