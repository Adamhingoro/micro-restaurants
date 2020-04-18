
<script>
    import { user , token , authorized , AuthenticateHandle } from '../stores/auth.store.js';
    let email = '';
    let password = '';

    function HandleSubmit() {
        console.log("Here we are baby");
        AuthenticateHandle(email , password);
    }
</script>

<div class="row">
    <div class="col col-md-4">
    </div>
    <div class="col col-md-4">
        <div class="card">
            <div class="card-header">
                Login
            </div>
            <div class="card-body">
                <input class="form-control" bind:value={email} type="text" placeholder="Email"> <br />
                <input class="form-control" bind:value={password} type="password" placeholder="Password"> <br />
                <button on:click={HandleSubmit} class="btn btn-primary btn-block">Login</button>
            </div>
        </div>
    </div>
    <div class="col col-md-4">
    </div>
</div>

<style>

</style>