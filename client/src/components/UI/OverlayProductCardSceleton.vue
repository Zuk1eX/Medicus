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
export default {
  name: "OverlayProductCard",
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

.results-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px;
  border-radius: 16px;
  transition: 0.2s ease-in-out;

  &__left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    flex: 50%;
  }

  &__img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    background-image: none;
    background-color: #e4e4e4;
    border-radius: 10px;
    animation: sceleton 1s infinite;
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
    background-color: #e4e4e4;
    width: 60%;
    padding: 5px;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;
  }

  &__description {
    color: rgba(0, 0, 0, 0.7);
    background-color: #e4e4e4;
    width: 90%;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;
  }

  &__offers {
    width: 50%;
    flex: calc(50% / 3);
    background-color: #e4e4e4;
    padding: 5px;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;
  }

  &__prices-range {
    text-align: center;
    font-weight: 600;
    flex: calc(50% / 3);
    background-color: #e4e4e4;
    padding: 5px;
    border-radius: 50vmin;
    animation: sceleton 1s infinite;
  }

  &__btn {
    // width: 15px;
    // height: 28px;
    background-image: url("@/assets/img/arrow_mini.svg");
    background-position: center;
    background-repeat: no-repeat;
    flex: calc(50% / 5);
  }
}
</style>