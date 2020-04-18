<script>
import { GetAllrestaurants } from '../../stores/restaurants.store.js';
import { authorized , user , token} from '../../stores/auth.store.js';
import { navigate } from "svelte-routing";
import { link } from "svelte-routing";
import Footer from "../../partialviews/footer.svelte";



if(!authorized){
    navigate("/admin/", { replace: true });
}

if($user.type != 1){
    navigate("/admin/", { replace: true });
}

let promise = GetAllrestaurants($token);

console.log("restaurants" , promise);

const NewObjectAnchor = () =>{
    navigate("/admin/restaurants/new", { replace: true });
}



</script>



<div class="col col-md-12">
    <div class="card">
        <div class="card-header">
        <span class="card-heading">restaurants Management</span>
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
                        <th  class="text-center">Image</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>Cuisine</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each items as { id, name , address , city , country , state , cuisine , imageURL }, i}
                        <tr>
                            <td>{ id }</td>
                            <td class="text-center">
                                {#if imageURL !== null}
                                    <img  src={ imageURL } class="restaurantImage" alt="Item Image" />
                                {:else}
                                    <span>No image Uploaded</span>
                                {/if}
                            </td>
                            <td>{ name }</td>
                            <td>{ address }</td>
                            <td>{ city }</td>
                            <td>{ country }</td>
                            <td>{ state }</td>
                            <td>{ cuisine }</td>
                            <td>
                                <a href="/admin/restaurants/{id}" use:link><i>Edit</i></a>
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
    .restaurantImage{
        width: 250px;
        border-radius: 10px;
    }
</style>