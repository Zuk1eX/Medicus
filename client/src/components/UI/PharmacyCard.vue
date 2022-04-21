<template>
  <div class="pharmacy-item">
    <div class="pharmacy-main">
      <img
        :src="require('@/assets/img/product_img.png')"
        alt=""
        class="pharmacy__img"
      />
      <div class="pharmacy-description">
        <h3 class="pharmacy__title">{{ title }}</h3>
        <div class="pharmacy-addresses">
          <p class="pharmacy__address">{{ region }}, {{ address }}</p>
          <p class="pharmacy__metro">{{ formatMetro }}</p>
        </div>
      </div>
    </div>
    <button class="pharmacy-favourite"></button>
    <div class="pharmacy-separator"></div>
    <div class="pharmacy-mods">
      <button
        title="Аптека предоставляет скидку на товар"
        class="pharmacy__mod"
        :class="{
          'pharmacy__mod--discount': isDiscounted,
          'pharmacy__mod--not-discount': !isDiscounted,
        }"
      ></button>
      <button
        title="Аптека работает в режиме 24/7"
        class="pharmacy__mod"
        :class="{
          'pharmacy__mod--247': isAllDay,
          'pharmacy__mod--not-247': !isAllDay,
        }"
      ></button>
    </div>
    <div class="pharmacy-separator"></div>
    <div class="pharmacy-contacts">
      <a :href="`tel:${phone}`" class="pharmacy__phone">{{ formatPhone }}</a>
      <a :href="`http://${site}`" target="_blank" class="pharmacy__site">{{
        site
      }}</a>
    </div>
    <div class="pharmacy-separator"></div>
    <p class="pharmacy__price">{{ formatPrice }}</p>
  </div>
</template>
<script>
export default {
  name: "PharmacyCard",
  props: {
    title: {
      type: String,
    },
    region: {
      type: String,
    },
    address: {
      type: String,
    },
    metro: {
      type: Array,
    },
    isAllDay: {
      type: Boolean,
    },
    phone: {
      type: String,
    },
    site: {
      type: String,
    },
    price: {
      type: Number,
    },
    isDiscounted: {
      type: Boolean,
    },
  },
  computed: {
    formatPrice() {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 2,
      })
        .format(this.price)
        .replace(",", ".");
    },
    formatPhone() {
      return this.phone.replace(
        /(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/,
        "$1 ($2) $3 $4 $5"
      );
    },
    formatMetro() {
      return this.metro.join(", ");
    },
  },
};
</script>
<style lang="scss" scoped>
.pharmacy-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pharmacy {
  &__img {
    width: 90px;
    height: 90px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__title {
    font-weight: 600;
    font-size: 18px;
  }

  &__address,
  &__metro {
    color: #828282;
    position: relative;
  }

  &__address::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    top: 0;
    left: -25px;
    background: url("@/assets/img/location_icon.svg") center no-repeat;
  }

  &__metro::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    top: 0;
    left: -25px;
    background: url("@/assets/img/metro_icon.svg") center no-repeat;
  }

  &__mod {
    width: 30px;
    height: 30px;
  }

  &__mod--discount {
    background: url("@/assets/img/discount_icon.svg") center no-repeat;
  }

  &__mod--247 {
    background: url("@/assets/img/247_icon.svg") center no-repeat;
  }

  &__mod--not-discount {
    background: url("@/assets/img/discount_icon.svg") center no-repeat;
    filter: opacity(15%);
    cursor: default;
  }

  &__mod--not-247 {
    background: url("@/assets/img/247_icon.svg") center no-repeat;
    filter: opacity(15%);
    cursor: default;
  }

  &__phone {
    font-size: 18px;
    font-weight: 600;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: -26px;
      background: url("@/assets/img/phone_icon.svg") center no-repeat;
    }
  }

  &__site {
    font-size: 18px;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: -25px;
      background: url("@/assets/img/site_icon.svg") center no-repeat;
    }
  }

  &__price {
    color: #5680e9;
    font-weight: 600;
    font-size: 26px;
    // margin-left: auto;
    flex: 0.2;
    text-align: right;
  }
}

.pharmacy-main {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  gap: 20px;
  flex: 0.65;
  margin-right: auto;
}

.pharmacy-description {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pharmacy-addresses {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 25px;
}

.pharmacy-favourite {
  width: 30px;
  height: 30px;
  border-radius: 50vmin;
  border: 2.5px solid #000000;
  background: url("@/assets/img/like_icon.svg") center no-repeat;
  margin-right: 20px;
}

.pharmacy-separator {
  width: 1px;
  height: 60px;
  background-color: #000000;
  border-radius: 50vmin;
}

.pharmacy-mods {
  display: flex;
  // justify-content: flex-start;
  gap: 10px;
  margin-right: auto;
  margin-left: 20px;
}

.pharmacy-contacts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: auto;
  margin-left: 45px;
}
</style>