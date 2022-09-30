<template>
  <div class="d-contents">
    <button
      class="button text-button bg-primary-orange shadow font-family-interui-medium pa-3 pointer"
      @click="$emit('btn-action')"
      :disabled="isDisabled"
    >
      {{ text }}
    </button>
  </div>
</template>

<script setup>
defineEmits(["btn-action"]);
defineProps({
  text: {
    type: String,
    default: "Click Me!",
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="css" scoped>
.button {
  border: none;
  color: var(--vt-c-white);
}

.button:disabled {
  background-color: var(--vt-c-white-mute);
  box-shadow: none;
}
</style>
