<script>
	import { handleSilentRefresh } from 'lucia-sveltekit/client';
	handleSilentRefresh();
</script>

<svelte:head>
	<title>Sveltekit Lucia Mongoose demo</title>
</svelte:head>

<slot />
