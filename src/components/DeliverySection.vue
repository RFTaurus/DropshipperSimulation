<template>
  <div class="d-contents">
    <BackNavigation :text="'Back to cart'" @click="$emit('btn-action')" />
    <div class="row align-items-center justify-content-space-between">
      <div class="col-12 col-lg-8">
        <TextBase
          :is-title="true"
          :is-bold="true"
          :is-color="'primary-orange'"
          :text="'Delivery details'"
        />
      </div>
      <div class="col-12 col-lg-4">
        <InputCheckbox
          v-model="isDropshipperValue"
          :label="'Send as dropshipper'"
        />
      </div>
    </div>
    <FormSection
      :is-dropshipper="isDropshipperValue"
      :form-input="formInput"
      :form-validation="formValidation"
      @update-form-input="updateFormInput"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import InputCheckbox from "./base/InputCheckbox.vue";
import TextBase from "./base/TextBase.vue";
import FormSection from "./FormSection.vue";
import BackNavigation from "./base/BackNavigation.vue";

const emit = defineEmits([
  "update-is-dropshipper",
  "update-form-input",
  "update-form-input-validation",
]);
const props = defineProps({
  formInput: {
    type: Object,
    default: () => {},
  },
  formValidation: {
    type: Object,
    default: () => {},
  },
  isDropshipper: {
    type: Boolean,
    default: false,
  },
});

const isDropshipperValue = ref(props.isDropshipper);

watch(isDropshipperValue, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    emit("update-is-dropshipper", newValue);
  }
});

const updateFormInput = (formData) => {
  emit("update-form-input", formData);
};
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
