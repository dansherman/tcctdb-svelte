<script context="module">
	export async function load({ params }) {
		const { slug } = params;
		const query = `
    *[_type == 'policyAndDocument' && slug.current == '${slug}'][0]{
      title,
      textContent,
      fileLink
    }`;
		const data = await client.fetch(query);

		return {
			props: { data }
		};
	}
</script>

<script>
	export let data = {};
	import client from '$lib/sanityClient.js';
	import PortableText from '@portabletext/svelte';
	import CustomParagraph from '$components/CustomParagraph_.svelte';
	import CustomHeading from '$components/CustomHeading.svelte';
	import ListWrapper from '$components/ListWrapper.svelte';
  import ListItem from '$components/ListItem.svelte';
</script>

<main>
	<div class="bg-white">
		<div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8">
			<h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
				{data.title}
			</h1>

			<div class="mt-10">
				<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:col-span-2 lg:max-w-3xl xl:max-w-none lg:text-xl lg:leading-8">
					<PortableText
						blocks={data.textContent}
						serializers={{
							blockStyles: {
								normal: CustomParagraph,
								h1: CustomHeading,
								h2: CustomHeading,
								h3: CustomHeading,
								list_bullet: ListWrapper,
                listItem_bullet: ListItem,
							}
						}}
					/>
				</div>
			</div>
		</div>
	</div>
</main>
