<script>
    import { GetCustomerById } from '../stores/customers.store.js';
    import { token } from "../stores/auth.store.js"
    export let id;
    console.log("FOUND ID " , id);
    let promise = GetCustomerById($token , id);
</script>

{#await promise}
    <span>Loading...</span>
{:then Customer}
    <span class="customer_name">{Customer.fullName}</span>
{:catch error}
    <span>Error loading Customer</span>
{/await}
<style>
    .customer_name{
        font-weight: bold;
    }
</style>