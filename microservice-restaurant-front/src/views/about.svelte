<script>
    import config from "../../src/config.js";
</script>

<main class="col col-xs-12 col-md-8">
	<h1 class="heading"> Welcome to <b>{config.application_name}!</b></h1>
	<p class="text-center">This platform is developed using svelte and axios.</p>
	<div class="row">
		<div class="col col-md-12 restaurants">
        <h2 class="heading">Story behind this <b>Application</b></h2>
        <p>I was bored during the corona virus lockdown but I have this habbit of doing something everytime. You will always find me doing one of thses 2. I am either learning something or building something. 
        Thanks to corona virus we had soo many websites offered their premium courses. I was lucky that I found Udacity and I quickly enrolled myself in Cloud-Computing nano degree program.
        The Udacity is amazing and I really liked their services. Well this is my capstone project build used svelte and backend is microservises API's based on docker images and hosted on kubernetes cluster interconnected with nginix</p>
		</div>
	</div>
</main>
<style>
	.restaurants{
		margin: 0px auto;
	}
	main {
		margin: 0 auto;
	}

	.heading {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		text-align: center;
	}
</style>