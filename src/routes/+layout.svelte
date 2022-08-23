<script>
	import { Lucia } from 'lucia-sveltekit/client';
</script>

<Lucia on:error={(e) => console.error(e)}>
	<slot />
</Lucia>
