<script>
import { GetAllUsers , DeleteUserById ,GetUserById } from '../../stores/users.store.js';
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

const HandleDelete = async (id) => {
    const user = await GetUserById($token , id);
    if (confirm("Are you sure you want delete user " + user.fullName + "("+user.email+")")) {
        const res = await DeleteUserById($token , id);
        if(res.status == 200){
            alert("User Deleted successfully");
            promise = GetAllUsers($token);
        } else {
            alert("Error Deleting");
        }
    }
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
                                <a class="btn btn-primary btn-sm" href="/admin/users/{id}" use:link><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a>
                                <button class="btn btn-danger btn-sm" on:click={ () => { HandleDelete(id) }}><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
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