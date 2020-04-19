<script>
	import RestaurantAsync  from './../partialviews/restaurantAsync.svelte';
	import { GetAllRestaurants } from "../stores/restaurants.store.js";
	import config from "../../src/config.js";
	let promise = GetAllRestaurants();

</script>
<main class="col col-xs-12 col-md-8">
	<h1 class="heading"> Welcome to <b>{config.application_name}!</b></h1>
	<p class="text-center">This application is built with Svelte, Express, Amazon-EC2, Kubernetes, Docker, S3 and Postgres</p>
	<div class="row">
		<div class="col col-md-12 restaurants">
			{#await promise}
				<h2>Loading all restaurants</h2>
			{:then restaurants}
				{#each restaurants as restaurant}	 
					<RestaurantAsync id={restaurant.id} pills={true} />
				{/each}
			{:catch error}
				<h2>Error while loading restaurants</h2>
			{/await}
		</div>
	</div>
</main>
<style>
	.restaurants{
		margin: 0px auto;
	}
	main {
		margin: 0 auto;
	}

	.heading {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		text-align: center;
	}
</style>