<template>
  <div>
    <div
      v-if="value && isInputValid"
      class="icon-wrapper"
      :style="`top: ${top}`"
    >
      <img
        class="icon filter-success"
        src="@/assets/icon/check.svg"
        alt="check"
      />
    </div>
    <div
      v-else-if="value && !isInputValid"
      class="icon-wrapper mark"
      :style="`top: ${top}`"
    >
      <img
        class="icon filter-failed"
        src="@/assets/icon/xmark.svg"
        alt="check"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: String,
    default: "",
  },
  isInputValid: {
    type: Boolean,
    default: false,
  },
  top: {
    type: String,
    default: "var(--gap)",
  },
});
</script>

<style lang="css" scoped>
.icon-wrapper {
  position: absolute;
  right: var(--gap-half);
  width: 100%;
  max-width: 16px;
  float: right;
}

.icon-wrapper.mark {
  width: 100%;
  max-width: 12px;
}

.icon-wrapper .icon,
.icon-wrapper.mark .icon {
  width: 100%;
  height: auto;
}
</style>
