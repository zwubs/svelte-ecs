<script lang="ts">
	import type { Entity } from '../../ecs/entity.svelte';

	export let selected: Entity;
	export let entities: Set<Entity>;
</script>

<select class="select flex-1" bind:value={selected} disabled={entities.size === 0}>
	{#each entities as entity}
		<option value={entity} selected={selected == entity}>{entity}</option>
	{/each}
</select>
