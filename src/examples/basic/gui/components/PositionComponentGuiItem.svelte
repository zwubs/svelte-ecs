<script lang="ts">
	import PositionIcon from 'virtual:icons/lucide/locate-fixed';
	import ComponentGuiItem from '$lib/gui/component-gui/ComponentGuiItem.svelte';
	import type { PositionComponent } from '../../components.svelte';
	import { SliderElement } from '$lib/gui/component-gui/elements';

	type Props = { component: PositionComponent; globals: App.Globals };
	let { component, globals } = $props<Props>();
	const { canvas } = globals;
</script>

<ComponentGuiItem title="Position" icon={PositionIcon}>
	<SliderElement name="X" value={component.x} max={canvas.width} unit="px" />
	<SliderElement name="Y" value={component.y} max={canvas.height} unit="px" />
</ComponentGuiItem>
