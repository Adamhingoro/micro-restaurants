<script>
import { GetAllMenus , GetAllMenusByrestaurant , DeleteMenuById, GetMenuById } from "../../stores/menus.store.js";
import { authorized , user , token} from '../../stores/auth.store.js';
import { navigate } from "svelte-routing";
import { link } from "svelte-routing";
import RestaurantLink from "../../partialviews/restaurantlink.svelte";
import Footer from "../../partialviews/footer.svelte";


if(!authorized){
    navigate("/admin/", { replace: true });
}

let promise;
if($user.type == 1){
    promise = GetAllMenus($token);
} else {
    promise = GetAllMenusByrestaurant($token , $user.ownership);
}

console.log("menus" , promise);

const NewObjectAnchor = () =>{
    navigate("/admin/menus/new", { replace: true });
}

const HandleDelete = async (id) => {
    const menu = await GetMenuById($token , id);
    if (confirm("Are you sure you want delete menu " + menu.name)) {
        const res = await DeleteMenuById($token , id);
        if(res.status == 200){
            alert("Menu Deleted successfully");
            if($user.type == 1){
                promise = GetAllMenus($token);
            } else {
                promise = GetAllMenusByrestaurant($token , $user.ownership);
            }
        } else {
            alert("Error Deleting");
        }
    }
}


</script>



<div class="col col-md-12">
    <div class="card">
        <div class="card-header">
        <span class="card-heading">Menus Management</span>
        <button class="btn btn-primary pull-right" on:click={NewObjectAnchor}> <i class="fa fa-plus-square" aria-hidden="true"></i>
 Add new</button></div>
        <div class="card-body">
            {#await promise}
                <p>...waiting</p>
            {:then items}
                <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        {#if $user.type == 1}
                            <th>restaurant</th>
                        {/if}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {#each items as { id, name , description , restaurantId }, i}
                        <tr>
                            <td>{ id }</td>
                            <td>{ name }</td>
                            <td>{ description }</td>
                            {#if $user.type == 1}
                                <td><RestaurantLink id={restaurantId} /></td>
                            {/if}
                            <td>
                                <a class="btn btn-primary btn-sm" href="/admin/menus/{id}" use:link><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a>
                                <a class="btn btn-primary btn-sm" href="/admin/menus/{id}/menuitems" use:link><i class="fa fa-sitemap" aria-hidden="true"></i> Items</a>
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