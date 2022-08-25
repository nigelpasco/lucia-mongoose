<script lang="ts">
	export let errors: { message: string };
	let email: string = '',
		password: string = '';

	// const login = async (e: SubmitEvent) => {
	// 	const form = e.target as HTMLFormElement;
	// 	form.submit();
	// };

	const signup = async () => {
		await fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		});
	};
</script>

<div>
	<h1>Sign Up</h1>
	<form on:submit|preventDefault={signup} method="post">
		<div>
			<label for="email"> Email address </label>
			<div>
				<input
					id="email"
					name="email"
					bind:value={email}
					type="email"
					autocomplete="email"
					required
				/>
			</div>
		</div>

		<div>
			<label for="password"> Password </label>
			<div>
				<input
					id="password"
					name="password"
					bind:value={password}
					type="password"
					autocomplete="current-password"
					required
				/>
			</div>
		</div>

		<div>
			<button type="submit">Sign Up</button>
		</div>
		<p>{errors?.message || ''}</p>
	</form>
</div>
