<script>
import { GetAllOrders , GetOrderStatuses } from '../../stores/orders.store.js';
import { authorized , user , token} from '../../stores/auth.store.js';
import CustomerLink from "../../partialviews/customerlink.svelte";
import { navigate } from "svelte-routing";
import { link } from "svelte-routing";
import moment from "moment";
import { onMount } from 'svelte';
import Footer from "../../partialviews/footer.svelte";




if(!authorized){
    navigate("/admin", { replace: true });
}



let promise = GetAllOrders($token);
let OrderStatuses;

onMount(async () => {
    OrderStatuses = await GetOrderStatuses($token);
    console.log("Statuses received " , OrderStatuses);
});

console.log("Orders" , promise);

const newUserpane = () =>{
    navigate("/admin/orders/new", { replace: true });
}



</script>



<div class="col col-md-12">
    <div class="card">
        <div class="card-header">
        <span class="card-heading">Orders Management</span>
        </div>
        <div class="card-body">
            {#await promise}
                <p>...waiting</p>
            {:then items}
                <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Order Date/Time</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each items as { id, customerId , createdAt , status , total}, i}
                        <tr>
                            <td>{ id }</td>
                            <td><CustomerLink id={customerId} /></td>
                            <td>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                            <td>${total}</td>
                            <td>
                                {#if OrderStatuses && OrderStatuses[status]}
                                    {OrderStatuses[status-1]}
                                {:else}
                                    Loading {status}
                                {/if}
                            </td>
                            <td>
                                <a href="/admin/orders/{id}" use:link><i>View</i></a>
                            </td>
                        </tr>
                    {/each}
                </tbody>
                </table>
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        
        </div>
        <div class="card-footer"><Footer /></div>
    </div>
</div>

<style>
.card-heading{
    color: #b14522;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 200;
    }
</style>