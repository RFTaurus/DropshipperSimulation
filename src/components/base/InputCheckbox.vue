<template>
  <div class="d-contents">
    <label class="checkbox-container text-detail black-soft">
      {{ label }}
      <input type="checkbox" :value="modelValue" @input="updateValue" />
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
defineProps({
  label: {
    type: String,
    default: "Check",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="css" scoped>
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 24px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  outline: none;
}
.checkbox-container input:focus {
  outline: none;
}
.checkmark {
  position: absolute;
  top: 3px;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: var(--vt-c-white);
  border: solid 2px var(--text-failed);
  outline: none;
}
.checkbox-container:hover input ~ .checkmark {
  background-color: var(--vt-c-white);
}
.checkbox-container input:checked ~ .checkmark {
  background-color: var(--vt-c-white);
  border: solid 2px var(--text-success);
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}
.checkbox-container .checkmark:after {
  left: 4px;
  top: -1px;
  width: 5px;
  height: 11px;
  border: solid var(--text-success);
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
