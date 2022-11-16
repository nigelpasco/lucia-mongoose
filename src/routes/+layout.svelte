<script lang="ts">
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';

	handleSession(page);
</script>

<svelte:head>
	<title>Sveltekit Lucia Mongoose demo</title>
</svelte:head>

<slot />
