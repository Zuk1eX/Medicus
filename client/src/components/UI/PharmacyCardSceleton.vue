<template>
  <div class="pharmacy-item">
    <div class="pharmacy-main">
      <div class="pharmacy__img"></div>
      <div class="pharmacy-description">
        <h3 class="pharmacy__title"></h3>
        <div class="pharmacy-addresses">
          <p class="pharmacy__address"></p>
          <p class="pharmacy__metro"></p>
        </div>
      </div>
    </div>
    <button class="pharmacy-favourite"></button>
    <div class="pharmacy-separator"></div>
    <div class="pharmacy-mods">
      <button
        title="Аптека предоставляет скидку на товар"
        class="pharmacy__mod"
      ></button>
      <button
        title="Аптека работает в режиме 24/7"
        class="pharmacy__mod"
      ></button>
    </div>
    <div class="pharmacy-separator"></div>
    <div class="pharmacy-contacts">
      <a class="pharmacy__phone"></a>
      <a class="pharmacy__site"></a>
    </div>
    <div class="pharmacy-separator"></div>
    <p class="pharmacy__price"></p>
  </div>
</template>
<script>
export default {
  name: "PharmacyCardSceleton",
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

.pharmacy-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.2s ease-in-out;
}

.pharmacy {
  &__img {
    width: 90px;
    height: 90px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #e4e4e4;
    border-radius: 10px;
    animation: sceleton 1s infinite;
  }

  &__title {
    font-weight: 600;
    font-size: 18px;
    width: 200px;
    height: 25px;
    background-color: #e4e4e4;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;
  }

  &__address,
  &__metro {
    color: #828282;
    position: relative;
    width: 300px;
    height: 15px;
    background-color: #e4e4e4;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;
  }

  &__address::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    top: 0;
    left: -25px;
    background-color: #e4e4e4;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;
  }

  &__metro::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    top: 0;
    left: -25px;
    background-color: #e4e4e4;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;
  }

  &__mod {
    width: 30px;
    height: 30px;
    background-color: #e4e4e4;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;
  }

  &__phone {
    font-size: 18px;
    font-weight: 600;
    position: relative;
    width: 150px;
    height: 15px;
    background-color: #e4e4e4;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;

    &::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: -25px;
      background-color: #e4e4e4;
      border-radius: 50vmin;
      animation: sceleton 1s infinite;
    }
  }

  &__site {
    font-size: 18px;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
    position: relative;
    width: 150px;
    height: 15px;
    background-color: #e4e4e4;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;

    &::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: -25px;
      background-color: #e4e4e4;
      border-radius: 50vmin;
      animation: sceleton 1s infinite;
    }
  }

  &__price {
    color: #5680e9;
    font-weight: 600;
    font-size: 26px;
    // margin-left: auto;
    // flex: 0.2;
    text-align: right;
    width: 150px;
    height: 25px;
    background-color: #e4e4e4;
    border-radius: 50vmin;
    margin-left: 20px;
    animation: sceleton 1s infinite;
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
  background-color: #e4e4e4;
  border-radius: 50vmin;
  margin-right: 20px;
  animation: sceleton 1s infinite;
}

.pharmacy-separator {
  width: 1px;
  height: 60px;
  background-color: #c7c7c7;
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