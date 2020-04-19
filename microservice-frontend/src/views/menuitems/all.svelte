<script>
import { GetAllMenus } from "../../stores/menus.store.js";
import { GetAllMenuItemsByMenu , DeleteMenuItemById , GetMenuItemById} from "../../stores/menuitems.store.js";
import { authorized , user , token} from '../../stores/auth.store.js';
import { navigate } from "svelte-routing";
import { link } from "svelte-routing";
import MenuLink from "../../partialviews/menulink.svelte";
import Footer from "../../partialviews/footer.svelte";

export let menuId;

if(!authorized){
    navigate("/admin/", { replace: true });
}

let promise = GetAllMenuItemsByMenu($token , menuId);


const NewObjectAnchor = () =>{
    navigate(`/admin/menus/${menuId}/menuitems/new`, { replace: true });
}

const HandleDelete = async (id) => {
    const menuitem = await GetMenuItemById($token , id);
    if (confirm("Are you sure you want delete item " + menuitem.name)) {
        const res = await DeleteMenuItemById($token , id);
        if(res.status == 200){
            promise = GetAllMenuItemsByMenu($token , menuId);
        } else {
            alert("Error Deleting");
        }
    }
}



</script>



<div class="col col-md-12">
    <div class="card">
        <div class="card-header">
        <span class="card-heading">Items of <MenuLink id={menuId} /></span>
        <button class="btn btn-primary pull-right" on:click={NewObjectAnchor}> <i class="fa fa-plus-square" aria-hidden="true"></i>
 Add new</button></div>
        <div class="card-body">
            {#await promise}
                <p>...waiting</p>
            {:then items}
                {#if items.length == 0}
                     <h3 class="text-center">CURRENTLY NO ITEMS HERE</h3>
                {:else}
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th  class="text-center">Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each items as { id, name , description , restaurantId , price , imageURL}, i}
                                <tr>
                                    <td>{ id }</td>
                                    <td class="text-center">
                                        {#if imageURL !== null}
                                            <img  src={ imageURL } class="menuItemImage" alt="Item Image" />
                                        {:else}
                                            <span>No image Uploaded</span>
                                        {/if}
                                    </td>
                                    <td>{ name }</td>
                                    <td>{ description }</td>
                                    <td>{ price }</td>
                                    <td>
                                        <a class="btn btn-primary btn-sm" href="/admin/menus/{menuId}/menuitems/{id}" use:link><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a>
                                        <button class="btn btn-danger btn-sm" on:click={ () => { HandleDelete(id) }}><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {/if}
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
    .menuItemImage{
        width: 250px;
        border-radius: 10px;
    }
</style>