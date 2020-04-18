<script>
    import { GetMenuItemById } from '../stores/menuitems.store.js';
    export let id ;
    let promise = GetMenuItemById( id );
</script>

{#await promise}
    <span>Loading...</span>
{:then item}
    <div>{item.name}</div>
{:catch error}
    <span>Error loading item</span>
{/await}