<script>
import { GetAllCustomers } from '../../stores/customers.store.js';
import { authorized , user , token} from '../../stores/auth.store.js';
import RestaurantLink from "../../partialviews/restaurantlink.svelte";
import { navigate } from "svelte-routing";
import { link } from "svelte-routing";
import Footer from "../../partialviews/footer.svelte";



if(!authorized){
    navigate("/admin/", { replace: true });
}
console.log("Customers " , $user);
if($user.type != 1){
    console.log("Not Allowed to view");
    navigate("/admin/", { replace: true });
}


let promise = GetAllCustomers($token);

console.log("Customers" , promise);

const newUserpane = () =>{
    navigate("/admin/customers/new", { replace: true });
}



</script>



<div class="col col-md-12">
    <div class="card">
        <div class="card-header">
        <span class="card-heading">Customers Management</span>
        </div>
        <div class="card-body">
            {#await promise}
                <p>...waiting</p>
            {:then items}
                <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {#each items as { id, fullName , email , city , state , country}, i}
                        <tr>
                            <td>{ id }</td>
                            <td>{ email }</td>
                            <td>{ fullName }</td>
                            <td>{ city }</td>
                            <td>{ state }</td>
                            <td>{ country }</td>
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