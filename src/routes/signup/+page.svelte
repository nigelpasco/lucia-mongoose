<script lang="ts">
	export let errors: { email: string; message: string };
	let email: string, password: string;

	const signup = async (e: SubmitEvent) => {
		const form = e.target as HTMLFormElement;
		form.submit();
	};
</script>

<div>
	<h2>Create an account</h2>
	<form on:submit|preventDefault={signup} action="/signup" method="post">
		<label for="email">email</label><br />
		<input id="email" name="email" type="email" bind:value={email} /><br />
		<p class="error">{errors?.email || ''}</p>
		<label for="password">password</label><br />
		<input type="password" id="password" name="password" bind:value={password} /><br />
		<input type="submit" value="Continue" class="button" />
	</form>
	<p class="error">{errors?.message || ''}</p>
	<a href="/login" class="link">Sign in</a>
</div>
