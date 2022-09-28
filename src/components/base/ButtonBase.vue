<template>
  <div class="d-contents">
    <button
      class="button text-button bg-primary-orange shadow font-family-interui-medium pa-3 pointer"
      @click="$emit('btn-action')"
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
});
</script>

<style lang="css" scoped>
.button {
  border: none;
  color: var(--vt-c-white);
}
</style>
