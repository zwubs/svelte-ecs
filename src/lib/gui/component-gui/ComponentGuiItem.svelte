<script lang="ts">
	import ChevronDownIcon from 'virtual:icons/lucide/chevron-down';
	import ChevronUpIcon from 'virtual:icons/lucide/chevron-up';
	import type { Component } from 'svelte';
	import { AccordionItem } from '@skeletonlabs/skeleton';

	type Props = { icon: Component; title: string };
	let { icon, title }: Props = $props();
</script>

<AccordionItem regionPanel="w-full" class="flex-1" caretClosed="rotate-90">
	<svelte:fragment slot="lead">
		<svelte:component this={icon} color="#ffffff" />
	</svelte:fragment>
	<svelte:fragment slot="summary">{title}</svelte:fragment>
	<svelte:fragment slot="content">
		<slot>
			<span>Nothing to see here.</span>
		</slot>
	</svelte:fragment>
	<svelte:fragment slot="iconOpen"><ChevronDownIcon /></svelte:fragment>
	<svelte:fragment slot="iconClosed"><ChevronUpIcon /></svelte:fragment>
</AccordionItem>
