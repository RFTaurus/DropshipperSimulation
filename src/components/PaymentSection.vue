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
      <div
        v-for="shipment in shipmentTypes"
        :key="shipment.id"
        class="col-12 col-md-6 col-lg-4 my-2 mini-card-gap"
      >
        <MiniCard
          :model-value="shipment.name"
          :text="shipment.name"
          :is-currency="true"
          :currency="shipment.cost"
          :is-active="selectedShipment.id === shipment.id"
          @click="selectShipmentMethod(shipment)"
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
      <div
        v-for="payment in paymentTypes"
        :key="payment.id"
        class="col-12 col-md-6 col-lg-4 my-2 mini-card-gap"
      >
        <MiniCard
          :model-value="payment.name"
          :text="payment.name"
          :is-currency="payment.isCurrency"
          :currency="payment.balance"
          :unit-text="payment.unitText"
          :is-active="selectedPayment.id === payment.id"
          :top="topValue"
          @click="selectPaymentMethod(payment)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { PSEUDOLOCAL_DATABASE_PATH } from "../utils/constant";
import { getDataPath } from "../store/pseudolocalDatabase";
import { SHIPMENT_TYPES, PAYMENT_TYPES } from "../utils/constant";
import TextBase from "./base/TextBase.vue";
import MiniCard from "./base/MiniCard.vue";
import BackNavigation from "./base/BackNavigation.vue";

const emit = defineEmits(["update-payment-method", "update-shipment-method"]);
const formDataPath = ref(PSEUDOLOCAL_DATABASE_PATH.dropshipData);
const shipmentTypes = ref(SHIPMENT_TYPES);
const getDeliveryData = ref(getDataPath(formDataPath.value));
const selectedShipment = ref(getDeliveryData.value.shipmentTypes);

const paymentTypes = ref(PAYMENT_TYPES);
const selectedPayment = ref(getDeliveryData.value.paymentTypes);

const topValue = computed(() => {
  if (selectedPayment.value.id === "bankTransfer") {
    return "var(--gap-quarter)";
  } else if (selectedPayment.value.id === "virtualAccount") {
    return "var(--gap-quarter)";
  }
  return "var(--gap)";
});

const selectShipmentMethod = (shipment) => {
  selectedShipment.value = shipment;
  emit("update-shipment-method", selectedShipment.value);
};

const selectPaymentMethod = (payment) => {
  selectedPayment.value = payment;
  emit("update-payment-method", selectedPayment.value);
};
</script>

<style lang="css" scoped>
@media (min-width: 768px) {
  .mini-card-gap {
    margin-right: var(--gap-half);
  }
}
</style>
