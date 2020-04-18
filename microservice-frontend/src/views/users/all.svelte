<script>
import { GetAllUsers } from '../../stores/users.store.js';
import { authorized , user , token} from '../../stores/auth.store.js';
import RestaurantLink from "../../partialviews/restaurantlink.svelte";
import { navigate } from "svelte-routing";
import { link } from "svelte-routing";
import Footer from "../../partialviews/footer.svelte";



if(!authorized){
    navigate("/admin/", { replace: true });
}
console.log("Users " , $user);
if($user.type != 1){
    console.log("Not Allowed to view");
    navigate("/admin/", { replace: true });
}


let promise = GetAllUsers($token);

console.log("Users" , promise);

const newUserpane = () =>{
    navigate("/admin/users/new", { replace: true });
}



</script>



<div class="col col-md-12">
    <div class="card">
        <div class="card-header">
        <span class="card-heading">Users Management</span>
        <button class="btn btn-primary pull-right" on:click={newUserpane}> <i class="fa fa-plus-square" aria-hidden="true"></i>
 Add new</button>
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
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each items as { id, fullName , email , type , ownership}, i}
                        <tr>
                            <td>{ id }</td>
                            <td>{ email }</td>
                            <td>{ fullName }</td>
                            <td>
                                {#if type == 1}
                                     Administrator
                                {:else}
                                    Owner Of
                                     <RestaurantLink id={ownership} />
                                {/if}
                            </td>
                            <td>
                                <a href="/admin/users/{id}" use:link><i>Edit</i></a>
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