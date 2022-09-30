<template>
  <div class="d-contents">
    <div
      :class="`input-wrapper ${borderValidationColor} ${
        !isDropshipper ? 'is-disabled' : ''
      }`"
    >
      <div v-if="isTextArea" class="input-field">
        <textarea
          :disabled="!isDropshipper"
          :value="modelValue"
          class="black font-family-interui-bold bold"
          :id="id"
          :name="id"
          :placeholder="placeholder"
          :rows="rows"
          :cols="cols"
          maxlength="120"
          @input="updateValue"
        ></textarea>
        <label
          :for="id"
          :class="`${labelValidationColor} font-family-interui-medium`"
          >{{ label }}</label
        >
        <IconValidation :value="modelValue" :is-input-valid="isInputValid" />
      </div>
      <div v-else class="input-field">
        <input
          :disabled="!isDropshipper"
          :value="modelValue"
          class="black font-family-interui-bold bold"
          :id="id"
          :type="type"
          :name="id"
          :placeholder="placeholder"
          :max="type === 'number' ? modelValue : ''"
          :min="type === 'number' ? modelValue : ''"
          @input="updateValue"
          @keypress="checkNumber($event)"
        />
        <label
          :for="id"
          :class="`${labelValidationColor} font-family-interui-medium`"
          >{{ label }}</label
        >
        <IconValidation :value="modelValue" :is-input-valid="isInputValid" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import IconValidation from "./IconValidation.vue";
const emit = defineEmits(["update:modelValue", "update:isInputValid"]);
const props = defineProps({
  isDropshipper: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "input",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "Input Field",
  },
  placeholder: {
    type: String,
    default: "Type here...",
  },
  rows: {
    type: Number,
    default: 5,
  },
  cols: {
    type: Number,
    default: 32,
  },
  isTextArea: {
    type: Boolean,
    default: false,
  },
  isInputValid: {
    type: Boolean,
    default: false,
  },
});

const labelValidationColor = computed(() =>
  !props.modelValue ? "black-mute" : props.isInputValid ? "success" : "failed"
);

const borderValidationColor = computed(() =>
  !props.modelValue ? "white-mute" : props.isInputValid ? "success" : "failed"
);

const checkNumber = (event) => {
  if (props.type === "number") {
    const evt = event ? event : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode === 46 || charCode === 101) {
      evt.preventDefault();
    } else {
      return true;
    }
  }
};

const updateValue = (event) => {
  const inputValidation = !!event.target.value;
  emit("update:isInputValid", inputValidation);
  emit("update:modelValue", event.target.value);
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
  transition: 0.5s;
}

.input-wrapper.is-disabled {
  background-color: var(--vt-c-white-mute);
  transition: 0.5s;
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
  background-color: none;
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
</style>
