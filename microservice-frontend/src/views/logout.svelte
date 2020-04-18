<script>
    import { LogoutUser  } from '../stores/auth.store.js';
    import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";

    onMount(async () => {
        LogoutUser();
        navigate("/", { replace: true });
        console.log("User Completely logged Out");
    });
</script>