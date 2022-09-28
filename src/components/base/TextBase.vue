<template>
  <div class="d-contents">
    <slot v-if="isCustomSlot" />
    <p
      v-else
      :class="`z-index-1 ${textClass()} ${isColor} ${isBold} ${customClass}`"
    >
      {{ props.text }}
    </p>
    <hr v-if="isTitle" class="divider" />
    <hr v-if="isMiniDivider" class="divider mini my-4" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  customClass: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "Text",
  },
  isCustomSlot: {
    type: Boolean,
    default: false,
  },
  isTitle: {
    type: Boolean,
    default: false,
  },
  isSubTitle: {
    type: Boolean,
    default: false,
  },
  isDetail: {
    type: Boolean,
    default: false,
  },
  isBold: {
    type: Boolean,
    default: false,
  },
  isColor: {
    type: String,
    default: "black",
  },
  isMiniDivider: {
    type: Boolean,
    default: false,
  },
});

const isBold = ref(props.isBold ? "bold" : "");
const isColor = ref(props.isColor);

const textClass = () => {
  if (props.isTitle) return "text-title";
  else if (props.isSubTitle) return "text-subtitle";
  else if (props.isDetail) return "text-detail";
  else return "";
};
</script>

<style lang="css" scoped>
.divider {
  background-color: var(--vt-c-grey);
  border: none;
  width: 100%;
  max-width: 300px;
  height: var(--gap-half);
  position: relative;
  transform: translateY(-1.125em);
}

.divider.mini {
  background-color: var(--vt-c-grey-light);
  max-width: 80px;
  height: var(--gap-octo);
  position: relative;
  transform: translateY(0em);
}
</style>
