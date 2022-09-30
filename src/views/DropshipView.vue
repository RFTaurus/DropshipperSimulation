<template>
  <div class="container position-center">
    <div class="bg-white border-quarter shadow my-4 pa-8">
      <div class="row align-items-stretch justify-content-space-between">
        <div class="col-12 col-md-7 col-lg-9">
          <FinalSection
            v-if="getDeliveryData.currentStep === 3"
            @generate-order-id="getOrderId"
            @btn-action="gotoHomepage"
          />
          <PaymentSection
            v-else-if="getDeliveryData.currentStep === 2"
            @update-shipment-method="updateShipmentMethod"
            @update-payment-method="updatePaymentMethod"
            @btn-action="backTo"
          />
          <DeliverySection
            v-else
            :form-input="getDeliveryData.form"
            :form-validation="getDeliveryData.formValidation"
            :is-dropshipper="getDeliveryData.isDropshipper"
            @update-is-dropshipper="updateIsDropshipper"
            @update-form-input="updateFormInput"
            @btn-action="backTo"
          />
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
                :is-detail="true"
                :is-color="'black-mute'"
                :text="'10 items purchased'"
              />
              <div v-show="deliveryText" class="d-contents">
                <TextBase
                  :is-mini-divider="true"
                  :is-detail="true"
                  :is-bold="true"
                  :is-color="'black'"
                  :text="'Delivery estimation'"
                />
                <TextBase
                  :is-bold="true"
                  :is-color="'success'"
                  :text="deliveryText"
                />
              </div>
              <div v-show="paymentText" class="d-contents">
                <TextBase
                  :is-mini-divider="true"
                  :is-detail="true"
                  :is-bold="true"
                  :is-color="'black'"
                  :text="'Payment Method'"
                />
                <TextBase
                  :custom-class="'mb-4'"
                  :is-bold="true"
                  :is-color="'success'"
                  :text="paymentText"
                />
              </div>
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
            <div v-show="getDeliveryData.isDropshipper" class="d-contents">
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
            <div v-show="getDeliveryData?.shipmentTypes?.id" class="d-contents">
              <div class="col-8">
                <TextBase :is-custom-slot="true">
                  <p class="black-mute mt-2">
                    <span class="black-soft bold">{{
                      getDeliveryData?.shipmentTypes?.name
                    }}</span>
                    shipment
                  </p>
                </TextBase>
              </div>
              <div class="col-4 text-right">
                <TextBase
                  :is-bold="true"
                  :custom-class="'mt-2'"
                  :is-color="'black'"
                  :text="formatCurrency(getDeliveryData?.shipmentTypes?.cost)"
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
                  :text="formatCurrency(totalCost)"
                />
              </div>
            </div>
            <div v-show="getDeliveryData.currentStep !== 3" class="d-contents">
              <div class="col-12 my-4">
                <ButtonBase
                  :text="btnText"
                  @btn-action="submitData"
                  :is-disabled="btnDisabled"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { getDataPath, setDataPath } from "../store/pseudolocalDatabase";
import { getDeliveryFormStructure } from "../model/deliveryData";
import { PSEUDOLOCAL_DATABASE_PATH } from "../utils/constant";
import { formatCurrency } from "../utils/common";
import { INPUT_REGEX } from "../utils/constant";
import TextBase from "../components/base/TextBase.vue";
import DeliverySection from "../components/DeliverySection.vue";
import PaymentSection from "../components/PaymentSection.vue";
import FinalSection from "../components/FinalSection.vue";
import ButtonBase from "../components/base/ButtonBase.vue";

const formDataPath = ref(PSEUDOLOCAL_DATABASE_PATH.dropshipData);
const getDeliveryData = ref(getDataPath(formDataPath.value));
const searchTimeout = ref(null);

const btnText = computed(() => {
  switch (getDeliveryData.value.currentStep) {
    case 3:
      return "";
    case 2:
      return `Pay with ${getDeliveryData.value?.paymentTypes?.name}`;
    default:
      return `Continue to Payment`;
  }
});

const totalCost = computed(() => {
  if (getDeliveryData.value.isDropshipper) {
    return (
      getDeliveryData.value.cost?.goods +
      getDeliveryData.value.cost?.dropshippingFee +
      getDeliveryData.value.cost?.shipment
    );
  }
  return (
    getDeliveryData.value.cost?.goods + getDeliveryData.value.cost?.shipment
  );
});

const btnDisabled = computed(() => {
  if (
    getDeliveryData.value.currentStep === 1 &&
    !getDeliveryData.value.isDropshipper
  ) {
    return false;
  } else if (
    getDeliveryData.value.currentStep === 2 &&
    getDeliveryData.value.shipmentTypes.id &&
    getDeliveryData.value.paymentTypes.id
  ) {
    return false;
  } else if (
    getDeliveryData.value.currentStep === 1 &&
    getDeliveryData.value.isDropshipper &&
    getDeliveryData.value.formValidation?.isValidEmail &&
    getDeliveryData.value.formValidation?.isValidPhone &&
    getDeliveryData.value.formValidation?.isValidAddress &&
    getDeliveryData.value.formValidation?.isValidDropshipperName &&
    getDeliveryData.value.formValidation?.isValidDropshipperPhone
  ) {
    return false;
  }
  return true;
});

const deliveryText = computed(() => {
  if (getDeliveryData.value?.shipmentTypes?.id) {
    return `${getDeliveryData.value?.shipmentTypes?.estimate} by ${getDeliveryData.value?.shipmentTypes?.name}`;
  }
  return "";
});

const paymentText = computed(() => {
  if (getDeliveryData.value?.paymentTypes?.id) {
    return getDeliveryData.value?.paymentTypes?.name;
  }
  return "";
});

watch(totalCost, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    getDeliveryData.value.cost.total = newValue;
  }
});

watch(getDeliveryData.value, (newValue) => {
  if (newValue) {
    clearTimeout(searchTimeout.value);
    searchTimeout.value = setTimeout(() => {
      saveData();
    }, 1000);
  }
});

const updateShipmentMethod = (newValue) => {
  getDeliveryData.value.shipmentTypes = newValue;
  getDeliveryData.value.cost.shipment = newValue.cost;
};

const updatePaymentMethod = (newValue) => {
  getDeliveryData.value.paymentTypes = newValue;
};

const getOrderId = (newValue) => {
  getDeliveryData.value.orderId = newValue;
};

const submitData = () => {
  if (getDeliveryData.value.currentStep < 3) {
    getDeliveryData.value.currentStep++;
  }
  getDeliveryData.value.cost.total = totalCost.value;
};

const saveData = () => {
  setDataPath(formDataPath.value, getDeliveryData.value);
};

const backTo = () => {
  if (getDeliveryData.value.currentStep !== 1) {
    getDeliveryData.value.currentStep -= 1;
  } else {
    alert("Kembali ke Cart");
  }
};

const gotoHomepage = () => {
  getDeliveryData.value.currentStep = 1;
  getDeliveryData.value = getDeliveryFormStructure();
};

const updateIsDropshipper = (newValue) => {
  getDeliveryData.value.isDropshipper = newValue;

  if (!newValue) {
    getDeliveryData.value.form.email = "";
    getDeliveryData.value.form.phone = "";
    getDeliveryData.value.form.deliveryAddress = "";
    getDeliveryData.value.form.dropshipperName = "";
    getDeliveryData.value.form.dropshipperPhone = "";

    getDeliveryData.value.formValidation.isValidEmail = false;
    getDeliveryData.value.formValidation.isValidPhone = false;
    getDeliveryData.value.formValidation.isValidAddress = false;
    getDeliveryData.value.formValidation.isValidDropshipperName = false;
    getDeliveryData.value.formValidation.isValidDropshipperPhone = false;
  }
};

const updateFormInput = (formData) => {
  getDeliveryData.value.form.email = formData.email;
  getDeliveryData.value.form.phone = formData.phone;
  getDeliveryData.value.form.deliveryAddress = formData.deliveryAddress;
  getDeliveryData.value.form.dropshipperName = formData.dropshipperName;
  getDeliveryData.value.form.dropshipperPhone = formData.dropshipperPhone;

  getDeliveryData.value.formValidation.isValidEmail = isEmailValid(
    formData.email
  );
  getDeliveryData.value.formValidation.isValidPhone = isPhoneValid(
    formData.phone
  );
  getDeliveryData.value.formValidation.isValidAddress = isAddressValid(
    formData.deliveryAddress
  );
  getDeliveryData.value.formValidation.isValidDropshipperName = isInputValid(
    formData.dropshipperName
  );
  getDeliveryData.value.formValidation.isValidDropshipperPhone = isPhoneValid(
    formData.dropshipperPhone
  );
};

const isInputValid = (input) => {
  return !!input;
};

const isAddressValid = (address) => {
  return address && address.length <= 120;
};

const isEmailValid = (email) => {
  const regex = INPUT_REGEX.email;
  if (regex.test(email?.toLowerCase())) {
    return true;
  }
  return false;
};

const isPhoneValid = (phone) => {
  const regex = INPUT_REGEX.phone;
  if (regex.test(phone)) {
    return phone?.length >= 6 && phone.length <= 20;
  }
  return false;
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
