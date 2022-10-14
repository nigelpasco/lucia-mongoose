<script lang="ts">
	import { signOut, getUser, refreshSession } from 'lucia-sveltekit/client';
	export let form: any;
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

	const refreshSess = async () => {
		try {
			const sess = await refreshSession();
			console.log('session refreshed');
		} catch (e) {
			// error
			const error = e as Error;
			console.log('error with refreshing session');
			console.log(error.message);
		}
	};
</script>

<p>This page is protected and can only be accessed by authenticated users.</p>
<hr />

<h2>Profile</h2>
<p>The details below are from the lucia getUser API call.</p>
<div>
	<p>user id: {user?.userId}</p>
	<p>username: {user?.userName}</p>
</div>
<hr />

<h4>The below uses lucia's generateRandomString() API to generate a crytpographically string.</h4>
<div>
	<form on:submit|preventDefault={fetchString} method="GET">
		<input type="submit" value="Get random string" class="button" />
	</form>
	<p>result: {randomString}</p>
</div>
<hr />

<h4>The below button refreshes the session with the refreshSession API call.</h4>
<button on:click={refreshSess}>Refresh Session</button>
<hr />

<h4>Update User Name</h4>
<form method="POST" action="?/updateUser">
	<label for="userName">New User Name</label><br />
	<input name="userName" type="text" value={form?.userName ?? ''} /><br />
	<input name="userId" type="hidden" value={user?.userId} />
	<button>Change My User Name</button>
</form>

<h4>Update Password</h4>
<form method="POST" action="?/updatePassword">
	<label for="password">new password</label><br />
	<input name="password" type="password" value={form?.password ?? ''} /><br />
	<input name="userId" type="hidden" value={user?.userId} />
	<button>Change My Password Please</button>
</form>
<hr />

<h4>The below button signs user out with the signOut API call.</h4>
<button on:click={signOutUser}>Sign out</button>
<hr />

<h4>Delete User</h4>
<form method="POST" action="?/deleteUser">
	<input name="userId" type="hidden" value={user?.userId} />
	<button>Delete User</button>
</form>
<i>WARNING: This will delete your account and can not be undone!</i>
