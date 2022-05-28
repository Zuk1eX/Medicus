<template>
    <search-header></search-header>
    <div class="section-error">
        <div class="container">
            <h3 class="error__number">404</h3>
            <p class="error__title">Кажется, такой страницы не существует</p>
            <p class="error__description">Возможно, искомого аптечного товара или аптеки не существует</p>
            <div class="error__link">
                <router-link :to="{ name: 'main' }">На главную</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import SearchHeader from "@/components/SearchHeader.vue";
export default {
    components: { SearchHeader },
};
</script> 
<style lang="css" scoped>
.section-error {
    background-color: #5680e9;
    padding: 30px 0;
}

.error__number {
    font-weight: 700;
    font-size: 100px;
    line-height: 100%;
    color: #ffffff;
    text-align: center;
    margin-bottom: 15px;
}

.error__title {
    text-align: center;
    color: #ffffff;
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 10px;
}

.error__description {
    text-align: center;
    color: #ffffff;
    font-weight: 300;
    font-size: 18px;
    margin-bottom: 30px;
}

.error__link {
    display: flex;
    justify-content: center;
}

.error__link a {
    padding: 11px 30px;
    background: #ffffff;
    border-radius: 50vmin;
    font-weight: 600;
    font-size: 16px;
    color: #5680e9;
    transition: box-shadow 0.3s ease;
}

.error__link a:hover {
    box-shadow: 0px 5px 60px rgba(255, 255, 255, 0.5);
}
</style>