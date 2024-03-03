<script>
	import BasicExampleIcon from 'virtual:icons/lucide/box';
	import BoidsExampleIcon from 'virtual:icons/lucide/bird';
	import OrbitExampleIcon from 'virtual:icons/lucide/orbit';
</script>

<main class="max-w-lg mx-auto p-4 flex flex-col gap-4">
	<header>
		<hgroup class="text-center">
			<h1 class="h1">Svelte ECS</h1>
			<p>A basic ECS implemented in Svelte</p>
		</hgroup>
	</header>

	<hr />

	<section class="flex flex-col gap-2">
		<hgroup class="text-center">
			<h2 class="h2">Examples</h2>
			<p>Dive in and checkout an example.</p>
		</hgroup>

		<div class="logo-cloud [&>.logo-item]:variant-ghost-surface grid-cols-2 gap-0.5">
			<a href="/examples/basic" class="logo-item">
				<BasicExampleIcon />
				<span>Basic</span>
			</a>
			<a href="/examples/boids" class="logo-item">
				<BoidsExampleIcon />
				<span>Boids</span>
			</a>
			<a href="/examples/orbit" class="logo-item">
				<OrbitExampleIcon />
				<span>Orbit</span>
			</a>
		</div>
	</section>
</main>

<style>
	.logo-cloud {
		border-radius: 0;
	}

	.logo-cloud.grid-cols-2 > *:nth-child(1) {
		border-top-left-radius: var(--theme-rounded-container);
	}

	.logo-cloud.grid-cols-2 > *:nth-child(2) {
		border-top-right-radius: var(--theme-rounded-container);
	}

	.logo-cloud.grid-cols-2 > *:nth-child(odd):nth-last-child(1) {
		border-bottom-left-radius: var(--theme-rounded-container);
		border-bottom-right-radius: var(--theme-rounded-container);
		grid-column: 1/3;
		justify-self: center;
		width: 50%;
	}

	.logo-cloud.grid-cols-2 > *:nth-child(odd):nth-last-child(3) {
		border-bottom-left-radius: var(--theme-rounded-container);
	}

	.logo-cloud.grid-cols-2 > *:nth-child(even):nth-last-child(2) {
		border-bottom-right-radius: var(--theme-rounded-container);
	}
</style>
