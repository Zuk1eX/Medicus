<template>
    <div class="container section-product">
        <h2 class="product__title"></h2>
        <div class="product__block">
            <div class="product__img" />
            <div class="product__info">
                <div class="product__description">
                    <p class="product__prop">
                        Действующее вещество (МНН):
                        <span class="sceleton-block"></span>
                    </p>
                    <p class="product__prop">
                        Фармакологическая группа:
                        <span class="sceleton-block"></span>
                    </p>
                    <p class="product__prop">
                        Производитель:
                        <span class="sceleton-vendor"></span>
                        <span class="sceleton-vendor"></span>
                    </p>
                </div>
                <div class="product__btns">
                    <button class="product__favourite" disabled>
                        <img :src="require('@/assets/icons/favourite-productpage-loading.svg')" alt="" />
                    </button>
                    <button class="product__link" disabled>Все формы выпуска</button>
                    <button class="product__link" disabled>Аналоги</button>
                    <button class="product__link" disabled>Синонимы</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ProductContainerSceleton",
};
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

.section-product {
    margin-bottom: 60px;
}

.product__title {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 30px;
    max-width: 800px;
    height: 28px;
    top: -6px;
    border-radius: 50vmin;
    @include after;
}

.product__block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
}

.product__img {
    display: block;
    width: 225px;
    height: 225px;
    object-fit: contain;
    // image-rendering: -webkit-optimize-contrast;
    border-radius: 10px;
    @include after;
}

.product__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1;
    align-self: stretch;
}

.product__description {
    display: flex;
    flex-direction: column;
    gap: 11px;
}

.product__prop {
    font-size: 18px;
    color: #6f6f6f;
}

.sceleton-block {
    font-size: inherit;
    font-weight: 600;
    color: #000000;
    display: inline-block;
    width: 300px;
    height: 20px;
    vertical-align: top;
    top: -2px;
    border-radius: 50vmin;
    @include after;
}

.sceleton-vendor {
    font-size: inherit;
    font-weight: 600;
    color: #000000;
    display: inline-block;
    width: 175px;
    height: 20px;
    vertical-align: top;
    top: -2px;
    border-radius: 50vmin;
    margin-right: 10px;
    @include after;
}

.product__btns {
    display: flex;
    gap: 10px;
}

.product__favourite {
    width: 40px;
    height: 40px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // border: 2px solid #5680e9;
    border-radius: 50vmin;
    cursor: default;
}

.product__favourite--active {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #5680e9;
    background-color: #5680e9;
    border-radius: 50vmin;
}

.product__link {
    padding: 10px 30px;
    border: 2px solid #cccccc;
    border-radius: 50vmin;
    font-weight: 600;
    font-size: 16px;
    color: #b9b9b9;
    cursor: default;
}
</style>