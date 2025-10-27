<script>
    let {
        title = "title", 
        subtitle = "subtitle",
    } = $props();
</script>

<div class="container plots-title">
    <h4>
        {title}
    </h4>
    <p>
        {subtitle}
    </p>
</div>

<style>
    .container {
        background-color: none;
        /* max-width: 700px; */
        margin: 0 auto;
        position: relative;
        /* padding-left: 15px;
        padding-right: 15px; */
        /* padding-top: 15px; */
    }

    .plots-title {
        /* max-width: 700px; */
        /* margin: 0 auto; */
    }

    /* .plots-title h4 {
        margin: 0;
    } */

    .plots-title p {
        margin-top: -25px;
        margin-bottom: -5px;
        font-family: RobotoRegular;
        font-size: 14.5px;
        line-height: 20px;
    }
</style>