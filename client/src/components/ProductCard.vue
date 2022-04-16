<template>
  <div class="card">
    <div class="card__top">
      <img
        alt=""
        class="card__img"
        :src="require('@/assets/img/product_img.png')"
      />
      <div class="card__mods">
        <img
          alt=""
          class="card__mod"
          :src="require('@/assets/img/product_mod.svg')"
        />
        <img
          alt=""
          class="card__mod"
          :src="require('@/assets/img/product_mod.svg')"
        />
      </div>
    </div>
    <h3 class="card__title">
      Оциллококцинум, гранулы гомеопатические, 1 г, 12 шт.
    </h3>
    <p class="card__company">Laboratoires Boiron, Франция</p>
    <div class="card__rating">
      <div class="rating__stars">
        <img :src="require('@/assets/img/rating_star.svg')" />
        <img :src="require('@/assets/img/rating_star.svg')" />
        <img :src="require('@/assets/img/rating_star.svg')" />
        <img :src="require('@/assets/img/rating_star.svg')" />
        <img :src="require('@/assets/img/rating_star.svg')" />
      </div>
      <p class="rating__rate">5</p>
    </div>
    <div class="separator"></div>
    <div class="card__pharmacies">
      <p class="pharmacies__all">
        В наличии в <span class="bold">2 600</span> аптеках
      </p>
      <p class="pharmacies__favourite">
        В <span class="bold">2</span> избранных
      </p>
    </div>
    <div class="card__bottom">
      <div class="card__price">Цена от <span class="bold">1 699 ₽</span></div>
      <button class="card__more">
        <img :src="require('@/assets/img/product_more.svg')" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {},
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 304px;
  height: 458px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  padding: 20px;
  transition: 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 5px 50px #81a0ef;
    border-radius: 16px;
    cursor: pointer;
    transform: perspective(1px) scale(1.01);

    .card__more {
      opacity: 1;
    }
  }

  &:hover .card__more {
    opacity: 1;
  }

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__mods {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__title {
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    margin-top: 15px;
    color: #202020;
  }

  &__company {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #828282;
    margin-top: 10px;
  }

  &__rating {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 25px;
    gap: 10px;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }

  &__price {
    font-weight: 400;
    font-size: 24px;
    line-height: 150%;
    color: #5680e9;
  }

  &__more {
    opacity: 0;
    transition: 0.3s ease-in-out;
  }
}

.rating {
  &__stars {
    display: flex;
    gap: 5px;
  }

  &__rate {
    font-weight: 600;
    font-size: 18px;
    line-height: 50%;
    color: #202020;
  }
}

.separator {
  width: 100%;
  height: 1px;
  background: #5680e9;
  border-radius: 1px;
  margin-top: 30px;
  margin-bottom: 20px;
}

.pharmacies__all,
.pharmacies__favourite {
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #202020;
}

.favourite {
  margin-top: 60px;
}

.bold {
  font-weight: 800;
}
</style>
