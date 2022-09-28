<template>
  <div class="d-contents">
    <div class="row">
      <div class="col-12">
        <div class="mini-container">
          <div class="mb-3">
            <TextBase
              :is-title="true"
              :is-bold="true"
              :is-color="'primary-orange'"
              :text="'Thank you'"
            />
          </div>
          <div>
            <TextBase
              :is-detail="true"
              :is-bold="true"
              :is-color="'black'"
              :text="`Order ID : ${randomString()}`"
            />
          </div>
          <div>
            <TextBase
              :is-detail="true"
              :is-color="'black-mute'"
              :text="`Your order will be delivered today with GO-SEND`"
            />
          </div>
          <div class="my-12">
            <BackNavigation @click="$emit('btn-action')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { randomString } from "../utils/common";
import TextBase from "./base/TextBase.vue";
import BackNavigation from "./base/BackNavigation.vue";

defineEmits(["btn-action"]);
</script>

<style lang="css" scoped>
@media (min-width: 768px) {
  .mini-container {
    width: 100%;
    max-width: 50%;
    margin: auto;
  }
}
</style>
