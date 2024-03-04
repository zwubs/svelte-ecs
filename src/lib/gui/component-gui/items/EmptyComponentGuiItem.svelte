<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { AccordionItem } from '@skeletonlabs/skeleton';

	export let icon: ComponentType;
	export let title: string;
</script>

<AccordionItem regionPanel="mx-2" class="flex-1" disabled>
	<svelte:fragment slot="lead">
		<svelte:component this={icon} color="#ffffff" />
	</svelte:fragment>
	<svelte:fragment slot="summary">{title}</svelte:fragment>
	<svelte:fragment slot="iconClosed">&nbsp;</svelte:fragment>
	<svelte:fragment slot="iconOpen">&nbsp;</svelte:fragment>
</AccordionItem>
