<template>
  <div class="d-contents">
    <BackNavigation :text="'Back to delivery'" @click="$emit('btn-action')" />
    <div class="row align-items-center justify-content-space-between">
      <div class="col-12">
        <TextBase
          :is-title="true"
          :is-bold="true"
          :is-color="'primary-orange'"
          :text="'Shipment'"
        />
      </div>
    </div>
    <div class="row align-items-stretch mb-8">
      <div class="col-12 col-md-6 col-lg-3 my-2 mini-card-gap">
        <MiniCard
          :model-value="'GO-SEND'"
          :text="'GO-SEND'"
          :is-currency="true"
          :currency="15000"
          :is-active="true"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-3 my-2 mini-card-gap">
        <MiniCard
          :model-value="''"
          :text="'JNE'"
          :is-currency="true"
          :currency="9000"
          :is-active="false"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-3 my-2 mini-card-gap">
        <MiniCard
          :model-value="''"
          :text="'Personal Courier'"
          :is-currency="true"
          :currency="29000"
          :is-active="false"
        />
      </div>
    </div>
    <div class="row align-items-center justify-content-space-between">
      <div class="col-12">
        <TextBase
          :is-title="true"
          :is-bold="true"
          :is-color="'primary-orange'"
          :text="'Payment'"
        />
      </div>
    </div>
    <div class="row align-items-stretch mb-8">
      <div class="col-12 col-md-6 col-lg-3 my-2 mini-card-gap">
        <MiniCard
          :model-value="''"
          :text="'e-wallet'"
          :is-currency="true"
          :currency="1500000"
          :unit-text="'left'"
          :is-active="false"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-3 my-2 mini-card-gap">
        <MiniCard
          :model-value="''"
          :text="'Bank Transfer'"
          :is-active="false"
          :top="'var(--gap-half)'"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-3 my-2 mini-card-gap">
        <MiniCard
          :model-value="'virtual account'"
          :text="'Virtual Account'"
          :is-active="true"
          :top="'var(--gap-quarter)'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TextBase from "./base/TextBase.vue";
import MiniCard from "./base/MiniCard.vue";
import BackNavigation from "./base/BackNavigation.vue";
</script>

<style lang="css" scoped>
@media (min-width: 768px) {
  .mini-card-gap {
    margin-right: var(--gap-half);
  }
}
</style>
