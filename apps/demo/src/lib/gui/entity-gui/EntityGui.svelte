<script lang="ts">
	import EntityIcon from 'virtual:icons/lucide/bird';
	import type { Entity } from '../../ecs/entity.svelte';
	import EntityGuiSelect from './EntityGuiSelect.svelte';

	type Props = { entity: Entity; entities: Set<Entity> };
	let { entity, entities } = $props<Props>();

	let card = $state<HTMLElement>();
</script>

<div class="card w-full flex flex-col variant-ghost-surface max-h-[90vh]" bind:this={card}>
	<hgroup class="p-4">
		<h1 class="h4 font-bold flex gap-2">
			<EntityIcon width="1.5rem" height="1.5rem" /><span>Entities</span>
		</h1>
		<p class="text-surface-100 text-sm">Select an entity to start editting.</p>
	</hgroup>
	<hr />
	<footer class="flex flex-row items-center gap-4 p-4">
		<EntityGuiSelect {entities} bind:selected={entity} />
	</footer>
</div>
