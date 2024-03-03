<script lang="ts">
	import ChevronUpIcon from 'virtual:icons/lucide/chevron-up';
	import type { ComponentType } from 'svelte';
	import { slide } from 'svelte/transition';

	const { icon, title, description } = $props<{
		icon: ComponentType;
		title: string;
		description: string;
	}>();

	let open = $state(true);
</script>

<section class="card w-full flex flex-col variant-ghost-surface">
	<header class="flex p-4 items-center gap-3">
		<svelte:component this={icon} color="#ffffff" width="1.75rem" height="1.75rem" />
		<hgroup class="flex-1">
			<h1 class="h4 font-bold">{title}</h1>
			<p class="text-surface-100 text-sm">{description}</p>
		</hgroup>
		<button
			class="btn-icon hover:bg-surface-hover-token self-center"
			on:click={() => (open = !open)}
		>
			<ChevronUpIcon
				class={`transition-transform duration-[250ms] rotate ${open ? '' : '-rotate-180'}`}
			/>
		</button>
	</header>
	{#if open}
		<div transition:slide={{ duration: 250 }} role="region">
			<hr />
			<slot>
				<div class="w-full text-center p-4">
					<p class="text-surface-300 text-sm">Nothing to see here.</p>
				</div>
			</slot>
		</div>
	{/if}
</section>
