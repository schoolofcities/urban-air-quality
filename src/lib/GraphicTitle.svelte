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
        margin: 0 auto;
        position: relative;
    }

    .plots-title {
        margin: 0 auto;
    }

    .plots-title h4 {
        font-size: 24px;
        line-height: 28px;
    }

    .plots-title p {
        margin-top: -30px;
        margin-bottom: -5px;
        font-family: OpenSans;
        font-size: 16px;
        line-height: 20px;
    }
</style>