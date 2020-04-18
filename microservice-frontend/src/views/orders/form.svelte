<script>
    import { onMount } from 'svelte';
    import { GetAllOrders , GetOrderStatuses , GetOrderItemsByOrderId , GetOrderById  , UpdateOrderStatus} from '../../stores/orders.store.js';
    import { token } from "../../stores/auth.store.js";
    import { navigate } from "svelte-routing";
    import moment from "moment";
    import MenuitemLink from "../../partialviews/menuitemlink.svelte";
    import { GetCustomerById } from '../../stores/customers.store.js';     

    


    export let id;

    let title = "Viewing";

    let userTypes = [
		{ id: 1, text: `Administrator` },
		{ id: 2, text: `restaurant Owner` },
	];

    let Order;
    let OrderItems;
    let OrderStatuses;
    let Customer;
    
    onMount(async () => {

        OrderStatuses = await GetOrderStatuses($token);
        OrderItems = await GetOrderItemsByOrderId($token , id);
        Order = await  GetOrderById($token , id);
        Customer = await GetCustomerById($token , Order.customerId);

    });
    
    const HandleSave = async () =>{
        let res = await UpdateOrderStatus($token , id , Order.status);
        console.log("Response " , res);
        if(res.status === 200){
            Order = res.data;
            alert("Order status updated");
        }
    }
</script>

<div class="row">
    <div class="col col-md-4 offset-md-2">
        <div class="card">
            <div class="card-header">{title} Order</div>
            <div class="card-body">
                {#if Order}
                    <form>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{Order.id}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{moment(Order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td>${Order.total}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Item name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each OrderItems as item}
                                    <tr>
                                        <td><MenuitemLink  id={item.menuItemId}/></td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.total}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                        {#if OrderStatuses}
                            <div class="form-group">
                                <label for="inputname">Current Status</label>
                                <select type="text" bind:value={Order.status} class="form-control" aria-describedby="nameHelp" placeholder="Secret">
                                    {#each OrderStatuses as item , key}
                                        <option value={key + 1}> {item} </option>
                                    {/each}
                                </select>
                            </div>
                        {/if}
                        <br />
                        <button type="button" on:click={HandleSave} class="btn btn-primary">Save</button>
                    </form>
                {:else}
                    <p>Loading Order</p>
                {/if}
                
            </div>
        </div>
    </div>
    <div class="col col-md-4">
        <div class="card">
            <div class="card-header">Customer Details</div>
            {#if Customer}
                <div class="card-body">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{Customer.fullName}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{Customer.email}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>{Customer.address}</td>
                            </tr>
                            <tr>
                                <th>City</th>
                                <td>{Customer.city}</td>
                            </tr>
                            <tr>
                                <th>State</th>
                                <td>{Customer.state}</td>
                            </tr>
                            <tr>
                                <th>Country</th>
                                <td>{Customer.country}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            {:else}
                Loading...
            {/if}
        </div>
    </div>
</div>