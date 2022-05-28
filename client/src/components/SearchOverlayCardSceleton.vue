<template>
    <div class="results-item">
        <div class="results-item__left">
            <div class="results-item__img" />
            <div class="results-item__text">
                <h3 class="results-item__title">&nbsp;</h3>
                <p class="results-item__description">&nbsp;</p>
            </div>
        </div>
        <p class="results-item__offers">&nbsp;</p>
        <p class="results-item__prices-range">&nbsp;</p>
        <a class="results-item__btn"></a>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@mixin after {
    background-color: #e4e4e4;
    position: relative;
    z-index: 1;
    overflow: hidden;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        animation: sceleton 1.5s infinite;
        background-color: #e4e4e4;
        background: linear-gradient(90deg, rgb(228, 228, 228) 0%, rgb(206, 206, 206) 50%, rgb(228, 228, 228) 100%);
    }
}

@keyframes sceleton {
    to {
        transform: translateX(100%);
    }
}

.results-item {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 16px;
    transition: 0.2s ease-in-out;

    &__left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        flex: 50%;
    }

    &__img {
        width: 80px;
        height: 80px;
        object-fit: contain;
        background-image: none;
        border-radius: 10px;
        @include after;
    }

    &__text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    &__title {
        font-size: 18px;
        font-weight: 600;
        width: 60%;
        padding: 5px;
        border-radius: 50vmin;
        @include after;
    }

    &__description {
        color: rgba(0, 0, 0, 0.7);
        width: 90%;
        border-radius: 50vmin;
        @include after;
    }

    &__offers {
        flex: calc(50% / 3 - 20px);
        padding: 5px;
        border-radius: 50vmin;
        margin: 0 10px;
        @include after;
    }

    &__prices-range {
        text-align: center;
        font-weight: 600;
        flex: calc(50% / 3 - 20px);
        padding: 5px;
        border-radius: 50vmin;
        margin: 0 10px;
        @include after;
    }

    &__btn {
        // width: 15px;
        // height: 28px;
        background-image: url("@/assets/icons/arrow-overlay.svg");
        background-position: center;
        background-repeat: no-repeat;
        flex: calc(50% / 4);
    }
}
</style>