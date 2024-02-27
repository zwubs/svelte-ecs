<script lang="ts">
	import DraggableIcon from 'virtual:icons/lucide/grip-vertical';
	let { element } = $props<{ element: HTMLElement }>();

	let moving = $state(false);

	function onMouseDown() {
		moving = true;
	}

	function onMouseMove(e: MouseEvent) {
		if (moving) {
			element.style.right = `${parseInt(element.style.right) - e.movementX}px`;
			element.style.top = `${parseInt(element.style.top) + e.movementY}px`;
		}
	}

	function onMouseUp() {
		moving = false;
	}
</script>

<button on:mousedown={onMouseDown}>
	<DraggableIcon class="cursor-move select-none" />
</button>
<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} on:contextmenu={onMouseUp} />
