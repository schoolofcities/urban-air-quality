<div class="aqhi-bar-container">
    <div class="aqhi-bar">
        <div class="aqhi-section low">
            <div class="aqhi-color-bar"></div>
            <div class="aqhi-label">Low</div>
            <div class="aqhi-range">1-3</div>
        </div>
        
        <div class="aqhi-section medium">
            <div class="aqhi-color-bar"></div>
            <div class="aqhi-label">Medium</div>
            <div class="aqhi-range">4-6</div>
        </div>
        
        <div class="aqhi-section high">
            <div class="aqhi-color-bar"></div>
            <div class="aqhi-label">High</div>
            <div class="aqhi-range">7-10</div>
        </div>
        
        <div class="aqhi-section very-high">
            <div class="aqhi-color-bar"></div>
            <div class="aqhi-label">Very High</div>
            <div class="aqhi-range">11</div>
        </div>
    </div>
</div>

<style>
    .aqhi-bar-container {
        width: 100%;
        margin-top: 20px;
    }

    .aqhi-bar {
        display: flex;
        width: 100%;
    }

    .aqhi-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .aqhi-color-bar {
        width: 100%;
        height: 18px;
    }

    .aqhi-section.low .aqhi-color-bar {
        background-color: #0099cc;
    }

    .aqhi-section.medium .aqhi-color-bar {
        background-color: #ffcc00;
    }

    .aqhi-section.high .aqhi-color-bar {
        background-color: #E60000;
    }

    .aqhi-section.very-high .aqhi-color-bar {
        background-color: #660000;
    }

    .aqhi-label {
        font-family: OpenSansBold, sans-serif;
        font-size: 14px;
        color: var(--brandGray90);
        margin-top: 2px;
        text-align: center;
    }

    .aqhi-range {
        font-family: OpenSans, sans-serif;
        font-size: 14px;
        color: var(--brandGray90);
        margin-top: 0px;
        text-align: center;
    }

    @media screen and (max-width: 600px) {
        .aqhi-label {
            font-size: 12px;
        }

        .aqhi-range {
            font-size: 11px;
        }
    }
</style>
