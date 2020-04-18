<script>
    import { GetRestaurantById } from '../stores/restaurants.store.js';
    import RestaurantView from "./restaurant.svelte";
    export let id , pills;
    console.log("FOUND ID " , id);
    let promise = GetRestaurantById( id );
</script>

{#await promise}
    <span>Loading...</span>
{:then restaurant}
    <RestaurantView restaurant={restaurant} pill={pills} />
{:catch error}
    <span>Error loading restaurant</span>
{/await}