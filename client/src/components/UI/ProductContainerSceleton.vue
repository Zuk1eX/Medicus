<template>
  <div class="product-section">
    <div class="product__title"></div>
    <div class="product-overview">
      <div class="product__img"></div>
      <div class="product-right">
        <div class="product-description">
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
            <span class="sceleton-vendor"></span>&nbsp;
            <span class="sceleton-vendor"></span>
          </p>
        </div>
        <div class="product-btns">
          <button class="product__favourite" disabled></button>
          <div class="product__link">Все формы выпуска</div>
          <div class="product__link">Аналоги</div>
          <div class="product__link">Синонимы</div>
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
@keyframes sceleton {
  0% {
    background-color: #e4e4e4;
  }
  50% {
    background-color: #ebebeb;
  }
  100% {
    background-color: #e4e4e4;
  }
}

.sceleton-block {
  display: inline-block;
  width: 300px;
  height: 20px;
  background-color: #e4e4e4;
  border-radius: 50vmin;
  vertical-align: middle;
  animation: sceleton 1s infinite;
}

.sceleton-vendor {
  display: inline-block;
  width: 200px;
  height: 20px;
  background-color: #e4e4e4;
  border-radius: 50vmin;
  vertical-align: middle;
  animation: sceleton 1s infinite;
}

.product {
  &__title {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 16px;
    width: 800px;
    height: 30px;
    background-color: #e4e4e4;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;
  }

  &__img {
    width: 233px;
    height: 233px;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 10px;
    background-color: #e4e4e4;
    border-radius: 10px;
    animation: sceleton 1s infinite;
  }

  &__prop {
    font-size: 18px;
    color: #828282;
  }

  &__favourite {
    width: 37px;
    height: 36px;
    border: 2px solid #5680e9;
    border-radius: 50vmin;
    background: url("@/assets/img/favourite_icon.svg") center no-repeat;
    filter: grayscale(100%) opacity(34%);
    margin-right: 15px;
    transition: all 0.2s ease-in-out;
    cursor: default;
  }

  &__link {
    border: 2px solid #dbdbdb;
    border-radius: 50vmin;
    padding: 8px 30px;
    color: #c2c2c2;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    cursor: default;
  }
}

.product-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-overview {
  display: flex;
  gap: 90px;
  margin-bottom: 60px;
}

.product-description {
  display: flex;
  flex-direction: column;
  gap: 10px;
  line-height: 150%;
}

.product-btns {
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>