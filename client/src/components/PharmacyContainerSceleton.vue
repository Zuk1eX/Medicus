<template>
    <div class="container section-pharmacy">
        <h2 class="pharmacy__title"></h2>
        <div class="pharmacy__block">
            <div class="pharmacy__img" />
            <div class="pharmacy__info pharmacy__info--left">
                <div class="pharmacy__description">
                    <p class="pharmacy__prop">
                        Адрес:
                        <span class="sceleton-block"></span>
                    </p>
                    <p class="pharmacy__prop">
                        Ближайшие станции метро:
                        <span class="sceleton-block--short"></span>
                    </p>
                    <p class="pharmacy__prop">
                        Телефон:
                        <span class="sceleton-block--short"></span>
                    </p>
                    <p class="pharmacy__prop">
                        E-mail:
                        <span class="sceleton-block--short"></span>
                    </p>
                    <p class="pharmacy__prop">
                        Сайт:
                        <span class="sceleton-block--short"></span>
                    </p>
                </div>
                <div class="pharmacy__btns">
                    <button class="pharmacy__favourite" disabled>
                        <img :src="require('@/assets/icons/favourite-productpage-loading.svg')" alt="" />
                    </button>
                    <a class="pharmacy__link">На карте</a>
                </div>
            </div>
            <div class="pharmacy__info pharmacy__info--right">
                <div class="pharmacy-schedule">
                    <p class="schedule__title">Режим работы:</p>
                    <div class="schedule__inner">
                        <div class="schedule__days">
                            <p>ПН-ПТ</p>
                            <p>СБ</p>
                            <p>ВС</p>
                        </div>
                        <div class="schedule__hours">
                            <span class="sceleton-schedule"></span>
                            <span class="sceleton-schedule"></span>
                            <span class="sceleton-schedule"></span>
                        </div>
                    </div>
                </div>
                <div class="pharmacy-description">
                    <p class="description__title">Как добраться:</p>
                    <span class="sceleton-block--description"></span>
                    <span class="sceleton-block--description--short"></span>
                    <span class="sceleton-block--description--middle"></span>
                </div>
            </div>
        </div>
        <img :src="require('@/assets/imgs/map.png')" alt="" class="pharmacy__map" />
    </div>
</template>
<script>
export default {
    name: "PharmacyContainerSceleton",
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

.section-pharmacy {
    margin-bottom: 30px;
}

.pharmacy__title {
    font-weight: 600;
    font-size: 28px;
    line-height: 100%;
    margin-bottom: 30px;
    max-width: 450px;
    height: 28px;
    top: -6px;
    border-radius: 50vmin;
    @include after;
}

.pharmacy__block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    margin-bottom: 30px;
}

.pharmacy__img {
    display: block;
    width: 225px;
    height: 225px;
    object-fit: contain;
    border-radius: 10px;
    // image-rendering: -webkit-optimize-contrast;
    align-self: start;
    @include after;
}

.pharmacy__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    /* flex: 1; */
    align-self: stretch;
    gap: 20px;
}

.pharmacy__info--left {
    flex: 1;
}

.pharmacy__info--right {
    min-width: 350px;
    width: 400px;
}

.pharmacy__description {
    display: flex;
    flex-direction: column;
    gap: 11px;
}

.pharmacy__prop {
    font-size: 18px;
    color: #6f6f6f;
}

.bold {
    font-size: inherit;
    font-weight: 600;
    color: #000000;
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

.sceleton-block--short {
    font-size: inherit;
    font-weight: 600;
    color: #000000;
    display: inline-block;
    width: 250px;
    height: 20px;
    vertical-align: top;
    top: -2px;
    border-radius: 50vmin;
    @include after;
}

.sceleton-block--description {
    font-size: inherit;
    font-weight: 600;
    color: #000000;
    display: inline-block;
    width: 350px;
    height: 20px;
    vertical-align: top;
    // top: -2px;
    border-radius: 50vmin;
    @include after;
}

.sceleton-block--description--short {
    font-size: inherit;
    font-weight: 600;
    color: #000000;
    display: inline-block;
    width: 250px;
    height: 20px;
    vertical-align: top;
    // top: -2px;
    border-radius: 50vmin;
    @include after;
}

.sceleton-block--description--middle {
    font-size: inherit;
    font-weight: 600;
    color: #000000;
    display: inline-block;
    width: 300px;
    height: 20px;
    vertical-align: top;
    // top: -2px;
    border-radius: 50vmin;
    @include after;
}

.sceleton-block--description:not(:last-child) {
    margin-bottom: 5px;
}

.sceleton-block--description--short:not(:last-child) {
    margin-bottom: 5px;
}

.sceleton-block--description--middle:not(:last-child) {
    margin-bottom: 5px;
}

.sceleton-schedule {
    font-size: inherit;
    font-weight: 600;
    color: #000000;
    display: block;
    width: 100px;
    height: 18px;
    border-radius: 50vmin;
    margin-bottom: 5px;
    @include after;
}

a.bold.site {
    text-decoration: underline;
    text-underline-offset: 2px;
}

.pharmacy__btns {
    display: flex;
    gap: 10px;
}

.pharmacy__favourite {
    width: 40px;
    height: 40px;
    /* display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #5680e9; */
    border-radius: 50vmin;
    cursor: default;
}

.pharmacy__favourite--active {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #5680e9;
    background-color: #5680e9;
    border-radius: 50vmin;
}

.pharmacy__link {
    padding: 10px 30px;
    border: 2px solid #cccccc;
    border-radius: 50vmin;
    font-weight: 600;
    font-size: 16px;
    color: #b9b9b9;
    cursor: default;
}

.pharmacy-schedule {
}

.schedule__title,
.description__title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 15px;
}

.schedule__inner,
.description__inner {
    font-size: 18px;
    line-height: 125%;
    color: #6f6f6f;
}

.schedule__inner {
    display: flex;
    gap: 10px;
    line-height: 125%;
}

.schedule__days,
.schedule__days p {
    color: inherit;
    font-size: inherit;
    line-height: inherit;
}

.schedule__hours,
.schedule__hours span {
    font-size: 18px;
    font-weight: 600;
    text-align: right;
    line-height: inherit;
}

.mini-bold {
}

.pharmacy-description {
    color: inherit;
    font-size: inherit;
}

.pharmacy__map {
    width: 100%;
    height: 225px;
    object-fit: cover;
    filter: grayscale(1);
    // image-rendering: -webkit-optimize-contrast;
    border-radius: 10px;
}
</style>