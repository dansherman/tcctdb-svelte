<script context="module">
	export const prerender = false;
	import { urlFor } from '$lib/img-url.js';
</script>

<script>
	export let person = {};
	$: bioWordCount = 0;
  $: displayHeadshot = person.displayHeadshot
	if (person.biography != null) {
		bioWordCount = person.biography.split(' ').length;
	}
	let avatar, fileinput, avatarType;
	avatar = urlFor(person.headshot);
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		avatarType = image.type;
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
	};

	const cancelEdit = () => {
		history.back();
	};
	const saveEdit = async () => {
		if (avatarType) {
			person.avatarData = avatar.split(',')[1]; //avatar.toString('base64')
			person.avatarType = avatarType;
		}
		let outputJSON = JSON.stringify(person);
		fetch(`/edit/${person.slug.current}/${person.key}/profile`, {
			method: 'POST', 
			mode: 'cors', 
			cache: 'no-cache', 
			credentials: 'same-origin', 
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow', 
			referrerPolicy: 'no-referrer', 
			body: outputJSON 
		})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log({ err });
			});
	};
</script>

<main>
	<!-- Hero section -->
	<div class="bg-white">
		<div class="">
			<div
			class="pb-16 sm:pb-24 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8"
			>
			
				<form class="pt-6 space-y-8 divide-y divide-slate-200">
					<div class="space-y-8 divide-y divide-slate-200">
						<div>
							<div>
								<h3 class="text-lg leading-6 font-medium text-slate-900">Edit Profile</h3>
								<p class="mt-1 text-sm text-slate-500">
									This information will be displayed in cast lists and on the webpage for any shows you are involved in.
								</p>
							</div>
							<div class="pt-3 mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 ">
								<div class="sm:col-span-3 px-4">
									<label for="first-name" class="block text-sm font-medium text-slate-700">
										First name
									</label>
									<div class="mt-1">
										<input
											type="text"
											name="first-name"
											id="first-name"
											bind:value={person.nameFirst}
											autocomplete="given-name"
											class="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-slate-300 rounded-md"
										/>
									</div>
									<label for="last-name" class="block text-sm font-medium text-slate-700">
										Last name
									</label>
									<div class="mt-1">
										<input
											type="text"
											name="last-name"
											id="last-name"
											bind:value={person.nameLast}
											autocomplete="family-name"
											class="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-slate-300 rounded-md"
										/>
									</div>
									<label for="biography" class="block text-sm font-medium text-slate-700"
										>Biography - ({bioWordCount} words)</label
									>
									<textarea
										id="biography"
										rows="6"
										bind:value={person.biography}
										class="shadow-sm focus:ring-rose-500 focus:border-rose-500 mt-1 block w-full sm:text-sm border border-slate-300 rounded-md"
									/>
								</div>
								<div class="sm:col-span-3 px-4">
									<label for="photo" class="block text-sm font-medium text-slate-700">
										Photo
									</label>
									<div class="mt-1 items-center ">
										<div class="overflow-hidden sm:h-48 md:h-72 lg:h-96">
											{#if avatar}
												<img
													src={avatar}
													alt={person.name}
													class="object-cover mx-auto max-w-full max-h-full object-top rounded-lg"
												/>
											{:else}
												<span
													class="sm:h-48 sm:w-48 md:h-72 md:w-72 lg:h-96 lg:w-96 inline-block rounded-full overflow-hidden bg-slate-100"
												>
													<svg
														class="h-full w-full text-slate-300"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
														/>
													</svg>
												</span>
											{/if}
											`
										</div>
									</div>

									<label for="cover-photo" class="block text-sm font-medium text-slate-700">
										Manage photo
									</label>
									
									<div class="flex flex-auto w-full">
                    <div
										class="grow mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md"
									>
										<div class="space-y-1 text-center">
											<svg
												class="mx-auto h-12 w-12 text-slate-400"
												stroke="currentColor"
												fill="none"
												viewBox="0 0 48 48"
												aria-hidden="true"
											>
												<path
													d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
											<div class="flex text-sm text-slate-600">
												<label
													for="file-upload"
													class="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500"
												>
													<span>Upload an image</span>
													<input
														id="file-upload"
														name="file-upload"
														type="file"
														accept=".jpg, .jpeg, .png, .gif, .svg, or .tiff"
														class="sr-only"
														on:change={(e) => onFileSelected(e)}
													/>
												</label>
												<p class="pl-1 hidden lg:block">or drag and drop</p>
											</div>
											<p class="text-xs text-slate-500">JPG, SVG, PNG, GIF or TIFF up to 10MB</p>
										</div>
									</div>
										<button
											type="button"
											on:click={() => (displayHeadshot = !displayHeadshot)}
											class=" ml-5 bg-white py-2 px-3 border border-slate-300 rounded-md shadow-sm text-sm leading-4 font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
											>
                      <div class="space-y-1 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 {displayHeadshot
                          ? 'text-emerald-500'
                          : 'text-rose-400'}" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                        </svg><p>Display on website?</p>
                      <p class="{displayHeadshot
                        ? 'text-emerald-500'
                        : 'text-rose-400'}">
                        {displayHeadshot
                        ? 'YES'
                        : 'no'}</p>
                      </div></button
										>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="pt-6 pb-16 sm:pb-24 mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8  border-2 border-emerald-400 border-dashed"
					>
						<div class="pt-8">
							<div>
								<h3 class="text-lg leading-6 font-medium text-slate-900">Personal Information</h3>
								<p class="mt-1 text-sm text-slate-500">This will not be shared beyond the production staff at 4CT.</p>
							</div>
							<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
								<div class="sm:col-span-4">
									<label for="email" class="block text-sm font-medium text-slate-700">
										Email address (required)</label
									>
									<div class="mt-1">
										<input
											bind:value={person.emailAddress}
											id="email"
											name="email"
											type="email"
											autocomplete="email"
											class="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-slate-300 rounded-md"
										/>
									</div>
								</div>

								<div class="sm:col-span-3">
									<label for="country" class="block text-sm font-medium text-slate-700">
										Country
									</label>
									<div class="mt-1">
										<select
											id="country"
											name="country"
											autocomplete="country-name"
											class="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-slate-300 rounded-md"
										>
											<option>United States</option>
											<option>Canada</option>
											<option>Mexico</option>
										</select>
									</div>
								</div>

								<div class="sm:col-span-6">
									<label for="street-address" class="block text-sm font-medium text-slate-700">
										Street address
									</label>
									<div class="mt-1">
										<input
											type="text"
											name="street-address"
											id="street-address"
											autocomplete="street-address"
											class="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-slate-300 rounded-md"
										/>
									</div>
								</div>

								<div class="sm:col-span-2">
									<label for="city" class="block text-sm font-medium text-slate-700"> City </label>
									<div class="mt-1">
										<input
											type="text"
											name="city"
											id="city"
											autocomplete="address-level2"
											class="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-slate-300 rounded-md"
										/>
									</div>
								</div>

								<div class="sm:col-span-2">
									<label for="region" class="block text-sm font-medium text-slate-700">
										State / Province
									</label>
									<div class="mt-1">
										<input
											type="text"
											name="region"
											id="region"
											autocomplete="address-level1"
											class="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-slate-300 rounded-md"
										/>
									</div>
								</div>

								<div class="sm:col-span-2">
									<label for="postal-code" class="block text-sm font-medium text-slate-700">
										ZIP / Postal code
									</label>
									<div class="mt-1">
										<input
											type="text"
											name="postal-code"
											id="postal-code"
											autocomplete="postal-code"
											class="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-slate-300 rounded-md"
										/>
									</div>
								</div>
							</div>
						</div>


						<div class="pt-5">
							<div class="flex justify-between">
								<div>
									<button
										type="button"
										on:click={cancelEdit}
										class="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
										>Cancel</button
									>
									<button
										type="button"
										on:click={saveEdit}
										class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
										>Save</button
									>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</main>
