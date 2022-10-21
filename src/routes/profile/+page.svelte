<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { signOut, getUser } from 'lucia-sveltekit/client';
	import type { ActionData } from './$types';
	export let form: ActionData;
	const user = getUser();

	const signOutUser = async () => {
		await signOut('/');
	};

	let randomString = '';

	const fetchString = async () => {
		const response = await fetch('/api/random-string', {
			headers: {}
		});
		const result = await response.json();
		if (result.error) {
			console.error(result.error);
			return;
		}
		randomString = result.randomString;
	};
</script>

<p>This page is protected and can only be accessed by authenticated users.</p>
<hr />

<h2>Profile</h2>
<p>The details below are from the lucia getUser API call.</p>
<div>
	<p>user id: {user?.userId}</p>
	<p>username: {user?.username}</p>
</div>
<hr />

<div>
	<h2>Notes</h2>
	<h4>The below updates the Notes session cookie</h4>
	<form method="post" action="?/updateNote" use:enhance>
		<input value={$page.data.notes} name="notes" />
		<input type="submit" value="Save" class="button" />
	</form>
</div>

<div>
	<h2>Random String</h2>
	<h4>The below uses lucia's generateRandomString() API to generate a crytpographically string.</h4>
	<form on:submit|preventDefault={fetchString} method="GET">
		<input type="submit" value="Get random string" class="button" />
	</form>
	<p>result: {randomString}</p>
</div>
<hr />

<button on:click={() => signOut('/auth')}>Sign out</button>

<h4>Update User Name</h4>
<form method="POST" action="?/updateUser">
	<label for="username">New User Name</label><br />
	<input name="username" type="text" value={form?.username ?? ''} />
	<button>Change My User Name</button>
</form>

<h4>Update Password</h4>
<form method="POST" action="?/updatePassword">
	<label for="password">new password</label><br />
	<input name="password" type="password" value={form?.password ?? ''} />
	<button>Change My Password Please</button>
</form>
<hr />

<h4>The below button signs user out with the signOut API call.</h4>
<button on:click={signOutUser}>Sign out</button>
<hr />

<h4>Delete User</h4>
<form method="POST" action="?/deleteUser">
	<button>Delete User</button>
</form>
<i>WARNING: This will delete your account and can not be undone!</i>
