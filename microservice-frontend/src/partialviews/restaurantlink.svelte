<script>
    import { GetrestaurantById } from '../stores/restaurants.store.js';
    import { token } from "../stores/auth.store.js"
    export let id;
    console.log("FOUND ID " , id);
    let promise = GetrestaurantById($token , id);
</script>

{#await promise}
    <span>Loading...</span>
{:then restaurant}
    <span class="restaurant_name">{restaurant.name}</span>
{:catch error}
    <span>Error loading restaurant</span>
{/await}

<style>
    .restaurant_name{
        font-weight: bold;
    }
</style>