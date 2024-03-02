<script lang="ts">
	import type { Entity } from '../ecs/entity.svelte';
	import type { Canvas } from '../ecs/canvas.svelte';
	import ComponentGui from './component-gui/ComponentGui.svelte';
	import EntityGui from './entity-gui/EntityGui.svelte';

	export let entity: Entity;
	export let entities: Set<Entity>;
	export let canvas: Canvas;
</script>

<div class="absolute m-4 w-full max-w-md flex flex-col gap-4" style="right: 0px; top: 0px;">
	<EntityGui {entities} bind:entity />
	<ComponentGui bind:entity {canvas} />
</div>
