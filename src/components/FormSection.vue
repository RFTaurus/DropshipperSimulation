<template>
  <div class="d-contents">
    <div class="row align-items-start justify-content-space-between my-8">
      <div class="col-12 col-lg-6">
        <div class="row align-items-start">
          <div class="col-12 my-2">
            <InputField
              v-model="formData.email"
              :id="'email'"
              :label="'Email'"
              :is-input-valid="formDataValidation.isValidEmail"
              :is-dropshipper="isDropshipper"
            />
          </div>
          <div class="col-12 my-2">
            <InputField
              v-model="formData.phone"
              :type="'number'"
              :id="'phone'"
              :label="'Phone Number'"
              :is-input-valid="formDataValidation.isValidPhone"
              :is-dropshipper="isDropshipper"
            />
          </div>
          <div class="col-12 my-2">
            <InputField
              v-model="formData.deliveryAddress"
              :id="'deliveryAddress'"
              :label="'Delivery Address'"
              :is-text-area="true"
              :is-input-valid="formDataValidation.isValidAddress"
              :is-dropshipper="isDropshipper"
            />
            <small class="text-right"
              >Max Length:
              <strong>{{ formData.deliveryAddress?.length || 0 }}</strong
              >/120</small
            >
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="row align-items-start">
          <div class="col-12 my-2">
            <InputField
              v-model="formData.dropshipperName"
              :id="'dropshipperName'"
              :label="'Dropshipper Name'"
              :is-input-valid="formDataValidation.isValidDropshipperName"
              :is-dropshipper="isDropshipper"
            />
          </div>
          <div class="col-12 my-2">
            <InputField
              v-model="formData.dropshipperPhone"
              :type="'number'"
              :id="'dropshipperPhoneNumber'"
              :label="'Dropshipper Phone Number'"
              :is-input-valid="formDataValidation.isValidDropshipperPhone"
              :is-dropshipper="isDropshipper"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import InputField from "./base/InputField.vue";
const emit = defineEmits(["update-form-input", "update-form-input-validation"]);
const props = defineProps({
  isDropshipper: {
    type: Boolean,
    default: false,
  },
  formInput: {
    type: Object,
    default: () => {},
  },
  formValidation: {
    type: Object,
    default: () => {},
  },
});

const formData = ref(props.formInput);
const formDataValidation = ref(props.formValidation);
const searchTimeout = ref(null);

watch(formData.value, (newValue) => {
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    emit("update-form-input", newValue);
  }, 1000);
});
</script>

<style lang="css" scoped>
label,
textarea,
input {
  transition: all 0.2s;
  touch-action: manipulation;
}

.input-wrapper {
  width: 100%;
  padding: 8px 8px;
  padding-top: 0px;
  border: solid 2px var(--vt-c-white-mute);
}

.input-wrapper ::-webkit-input-placeholder {
  opacity: 0;
  transition: inherit;
}

.input-wrapper.success {
  border: solid 2px var(--text-success);
}

.input-wrapper.failed {
  border: solid 2px var(--text-failed);
}

.input-wrapper .input-field {
  display: flex;
  flex-flow: column-reverse;
}

.input-wrapper .input-field textarea,
.input-wrapper .input-field input {
  width: 87.5%;
  border: none;
  -webkit-appearance: none;
  cursor: text;
}

textarea:placeholder-shown + label,
input:placeholder-shown + label {
  color: var(--vt-c-black-mute);
  cursor: text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: translate(0, 0.75em) scale(1);
}

.input-wrapper .input-field textarea:focus::-webkit-input-placeholder,
.input-wrapper .input-field input:focus::-webkit-input-placeholder {
  opacity: 1;
}

textarea:not(:placeholder-shown) + label,
textarea:focus + label,
input:not(:placeholder-shown) + label,
input:focus + label {
  transform-origin: left bottom;
  transform: translateY(0) scale(0.75);
  cursor: pointer;
}

.input-wrapper .input-field textarea:focus,
.input-wrapper .input-field input:focus {
  outline: none;
}

.input-wrapper .icon-wrapper {
  position: absolute;
  top: var(--gap);
  right: var(--gap);
  width: 100%;
  max-width: 16px;
  float: right;
}

.input-wrapper .icon-wrapper.mark {
  width: 100%;
  max-width: 12px;
}

.input-wrapper .icon-wrapper .icon,
.input-wrapper .icon-wrapper.mark .icon {
  width: 100%;
  height: auto;
}
</style>
