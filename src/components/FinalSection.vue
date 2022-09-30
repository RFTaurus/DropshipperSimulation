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
              :text="`Order ID : ${orderId}`"
            />
          </div>
          <div>
            <TextBase
              :is-detail="true"
              :is-color="'black-mute'"
              :text="shipmentText"
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
import { computed, ref } from "vue";
import { PSEUDOLOCAL_DATABASE_PATH } from "../utils/constant";
import { getDataPath } from "../store/pseudolocalDatabase";
import { randomString } from "../utils/common";
import TextBase from "./base/TextBase.vue";
import BackNavigation from "./base/BackNavigation.vue";

const emit = defineEmits(["btn-action", "generate-order-id"]);

const formDataPath = ref(PSEUDOLOCAL_DATABASE_PATH.dropshipData);
const getDeliveryData = ref(getDataPath(formDataPath.value));

const orderId = computed(() => {
  if (getDeliveryData.value.orderId) {
    return getDeliveryData.value.orderId;
  }
  const id = randomString();
  emit("generate-order-id", id);
  return `Order ID : ${id}`;
});

const shipmentText = computed(() => {
  if (getDeliveryData.value.shipmentTypes.name) {
    return `Your order will be delivered today with ${getDeliveryData.value.shipmentTypes.name}`;
  }
  return `Your order will be delivered today with GO-SEND`;
});
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
