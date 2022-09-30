<template>
  <div class="d-contents">
    <div
      :class="`mini-card ${textType} black-soft font-family-interui-medium pa-2 px-4 justify-content-center ${isActive}`"
    >
      <p v-if="isCurrency" class="bold">
        {{ formatCurrency(props.currency) }} {{ props.unitText }}
      </p>
      <p class="bold">
        {{ text }}
      </p>
      <IconValidation :value="isActive" :is-input-valid="isActive" :top="top" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatCurrency } from "../../utils/common";
import IconValidation from "./IconValidation.vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "Shipment Items",
  },
  currency: {
    type: Number,
    default: 0,
  },
  unitText: {
    type: String,
    default: "",
  },
  isCurrency: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  top: {
    type: String,
    default: "var(--gap)",
  },
});

const textType = computed(() => (props.isCurrency ? "text-detail" : ""));
const isActive = computed(() => (props.isActive ? "active" : ""));
</script>

<style lang="css" scoped>
.mini-card {
  display: flex;
  flex: 1;
  flex-flow: column-reverse;
  border: solid 2px var(--vt-c-white-mute);
  width: 100%;
  max-width: 240px;
  height: auto;
  transition: 0.5s;
}

.mini-card.active {
  background-color: var(--text-success-light);
  border: solid 2px var(--text-success);
  transition: 0.5s;
}

@media (min-width: 1024px) {
  .mini-card {
    width: 100%;
    max-width: 320px;
  }
}
</style>
