<script lang="ts">
	import DeleteIcon from 'virtual:icons/lucide/minus';
	import type { Component } from '../../ecs/component.svelte';
	import type { Entity } from '../../ecs/entity.svelte';

	let { entity, component } = $props<{ entity: Entity; component: Component }>();

	const onDelete = () => {
		entity.delete(component);
	};
</script>

<button
	class="btn-icon btn-icon-sm variant-ghost-error rounded-container-token self-start"
	on:click={onDelete}
>
	<DeleteIcon />
</button>
