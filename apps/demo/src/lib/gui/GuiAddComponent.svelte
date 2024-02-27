<script lang="ts">
	import AddIcon from 'virtual:icons/lucide/plus';
	import * as Components from '../ecs/components.svelte';
	import type { Entity } from '../ecs/entity.svelte';
	import { HiddenComponent } from '../ecs/component.svelte';

	function inheritsFromClass(child: Function, parent: Function) {
		return child.prototype instanceof parent;
	}

	const componentsByName = new Map(Object.entries(Components).filter(([_, ctor]) => !inheritsFromClass(ctor, HiddenComponent)));
	const componentNames = Array.from(componentsByName.keys());

	let { entity } = $props<{ entity: Entity }>();

	let activeComponentNames = $derived(new Set(entity.components.map((component) => component.constructor.name)));
	let availableComponentNames = $derived(componentNames.filter((name) => !activeComponentNames.has(name)));

	let selected = $state('');

	const AddComponent = () => {
		const ctor = componentsByName.get(selected);
		if (!ctor) return;
		entity.add(new ctor());
		selected = '';
	};
</script>

<select class="select flex-1" bind:value={selected} disabled={availableComponentNames.length == 0}>
	<option value=""></option>
	{#each availableComponentNames as name}
		<option value={name} selected={selected == name}>{name}</option>
	{/each}
</select>
<button class="btn-icon btn-icon-sm variant-filled-primary rounded-container-token" on:click={AddComponent} disabled={availableComponentNames.length == 0}>
	<AddIcon />
</button>
