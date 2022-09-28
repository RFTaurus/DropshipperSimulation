<template>
  <div class="d-contents">
    <div class="pointer" @click="$emit('btn-action')">
      <p class="text-detail black boldfont-family-interui-medium">
        &larr; {{ text }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineEmits(["btn-action"]);
defineProps({
  text: {
    type: String,
    default: "Go to homepage",
  },
});
</script>

<style lang="css" scoped>
.button {
  border: none;
  color: var(--vt-c-white);
}
</style>
