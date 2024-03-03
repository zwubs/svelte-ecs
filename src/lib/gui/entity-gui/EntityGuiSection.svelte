<script lang="ts">
	import EntityIcon from 'virtual:icons/lucide/bird';
	import type { Entity } from '../../ecs/entity.svelte';
	import EntityGuiSelect from './EntityGuiSelect.svelte';
	import GuiSection from '../GuiSection.svelte';

	type Props = { entity: Entity; entities: Set<Entity> };
	let { entity, entities } = $props<Props>();
</script>

<GuiSection icon={EntityIcon} title="Entities" description="Select an entity to start editting.">
	<div class="flex flex-row items-center gap-4 p-4">
		<EntityGuiSelect {entities} bind:selected={entity} />
	</div>
</GuiSection>
