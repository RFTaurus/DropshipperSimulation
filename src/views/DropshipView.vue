<template>
  <div class="container position-center">
    <div class="bg-white border-quarter shadow my-4 pa-8">
      <div class="row align-items-stretch justify-content-space-between">
        <div class="col-12 col-md-7 col-lg-9">
          <FinalSection v-if="currentStep === 3" @btn-action="gotoHomepage" />
          <PaymentSection v-else-if="currentStep === 2" @btn-action="backTo" />
          <DeliverySection v-else @btn-action="backTo" />
        </div>
        <div class="col-12 col-md-5 col-lg-3 border-section">
          <div class="row align-items-start tablet-gap">
            <div class="col-12">
              <TextBase
                :is-sub-title="true"
                :is-bold="true"
                :is-color="'primary-orange'"
                :text="'Summary'"
              />
              <TextBase
                :is-mini-divider="true"
                :is-detail="true"
                :is-color="'black-mute'"
                :text="'10 items purchased'"
              />
              <TextBase
                :is-detail="true"
                :is-bold="true"
                :is-color="'black'"
                :text="'Delivery estimation'"
              />
              <TextBase
                :is-mini-divider="true"
                :is-bold="true"
                :is-color="'success'"
                :text="'today by GO-SEND'"
              />
              <TextBase
                :is-detail="true"
                :is-bold="true"
                :is-color="'black'"
                :text="'Payment Method'"
              />
              <TextBase
                :custom-class="'mb-4'"
                :is-bold="true"
                :is-color="'success'"
                :text="'Bank Transfer'"
              />
            </div>
          </div>
          <div class="row align-content-end tablet-gap">
            <div class="d-contents">
              <div class="col-6">
                <TextBase
                  :custom-class="'mt-2'"
                  :is-color="'black-mute'"
                  :text="'cost of goods'"
                />
              </div>
              <div class="col-6 text-right">
                <TextBase
                  :is-bold="true"
                  :custom-class="'mt-2'"
                  :is-color="'black'"
                  :text="formatCurrency(500000)"
                />
              </div>
            </div>
            <div class="d-contents">
              <div class="col-8">
                <TextBase
                  :custom-class="'mt-2'"
                  :is-color="'black-mute'"
                  :text="'Dropshipping fee'"
                />
              </div>
              <div class="col-4 text-right">
                <TextBase
                  :is-bold="true"
                  :custom-class="'mt-2'"
                  :is-color="'black'"
                  :text="formatCurrency(5900)"
                />
              </div>
            </div>
            <div class="d-contents">
              <div class="col-8">
                <TextBase :is-custom-slot="true">
                  <p class="black-mute mt-2">
                    <span class="black-soft bold">GO-SEND</span> shipment
                  </p>
                </TextBase>
              </div>
              <div class="col-4 text-right">
                <TextBase
                  :is-bold="true"
                  :custom-class="'mt-2'"
                  :is-color="'black'"
                  :text="formatCurrency(15000)"
                />
              </div>
            </div>
            <div class="d-contents">
              <div class="col-4">
                <TextBase
                  :custom-class="'mt-4'"
                  :is-sub-title="true"
                  :is-color="'primary-orange'"
                  :text="'Total'"
                />
              </div>
              <div class="col-8 text-right">
                <TextBase
                  :custom-class="'mt-4'"
                  :is-sub-title="true"
                  :is-color="'primary-orange'"
                  :text="formatCurrency(505900)"
                />
              </div>
            </div>
            <div class="d-contents">
              <div v-if="currentStep !== 3" class="col-12 my-4">
                <ButtonBase :text="btnText" @btn-action="submitData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { formatCurrency } from "../utils/common";
import TextBase from "../components/base/TextBase.vue";
import DeliverySection from "../components/DeliverySection.vue";
import PaymentSection from "../components/PaymentSection.vue";
import FinalSection from "../components/FinalSection.vue";
import ButtonBase from "../components/base/ButtonBase.vue";

const currentStep = ref(1);

const btnText = computed(() => {
  switch (currentStep.value) {
    case 3:
      return "";
    case 2:
      return "Pay with e-wallet";
    default:
      return "Continue to Payment";
  }
});

const submitData = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const backTo = () => {
  if (currentStep.value !== 1) {
    currentStep.value--;
  } else {
    alert("Kembali ke Cart");
  }
};

const gotoHomepage = () => {
  currentStep.value = 1;
};
</script>

<style lang="css" scoped>
.border-section {
  border-top: solid 1px var(--primary-text-orange);
  margin: var(--padding-gap) 0px;
}

.tablet-gap {
  padding-top: calc(var(--gap) * 1.5);
}

@media (min-width: 768px) {
  .border-section {
    border-top: none;
    border-left: solid 1px var(--primary-text-orange);
    margin: 0px;
  }

  .tablet-gap {
    padding-top: 0px;
    padding-left: calc(var(--gap) * 1.5);
  }
}
</style>
