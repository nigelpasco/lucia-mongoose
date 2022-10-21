<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
	let state: string = 'login';
</script>

<h2>{state === 'login' ? 'Sign in' : 'Create an Account'}</h2>
<form
	method="POST"
	action={state === 'login' ? '?/login' : '?/register'}
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'redirect') {
				window.location.href = result.location; // invalidateAll() + goto() will not work
				return;
			}
			applyAction(result);
		};
	}}
>
	<label for="username">email</label><br />
	<input name="username" type="email" value={form?.username ?? ''} /><br />
	<label for="password">password</label><br />
	<input name="password" type="password" /><br />
	{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}
	{#if form?.failed}<p class="error">Database Failed!</p>{/if}
	{#if state === 'login'}<button class="button">Log in</button>
	{:else}
		<button class="button" formaction="?/register">Register</button>{/if}
</form>
<p>
	{#if state === 'login'}<button on:click={() => (state = 'register')} class="link"
			>No Account? Create one here</button
		>
	{:else}<button on:click={() => (state = 'login')} class="link">No Account? Register here</button
		>{/if}
</p>

<style>
	.error {
		color: red;
	}
	.button {
		margin-top: 10px;
		padding: 5px;
		width: 150px;
	}
	.link {
		border: none;
		color: blue;
	}
</style>
