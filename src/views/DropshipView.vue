<template>
  <div class="container position-center">
    <div class="bg-white border-quarter shadow my-4 pa-4">
      <div class="row align-items-stretch justify-content-center">
        <div class="col-12 col-md-8">
          <div class="row align-items-start">
            <div class="col-12">
              <TextBase
                :is-title="true"
                :is-bold="true"
                :is-color="'primary-orange'"
                :text="'Delivery details'"
              />
            </div>
            <div class="col-12">
              <InputCheckbox
                v-model="isDropshipper"
                :label="'Send as dropshipper'"
              />
            </div>
          </div>
          <div class="row align-items-start my-8">
            <div class="col-12">
              <div class="input-wrapper">
                <div class="input-field">
                  <input
                    class="black bold"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="type here..."
                  />
                  <label for="name" class="black-mute">Name</label>
                  <div v-if="isTrue" class="icon-wrapper">
                    <img
                      class="icon filter-success"
                      src="@/assets/icon/check.svg"
                      alt="check"
                    />
                  </div>
                  <div v-else class="icon-wrapper mark">
                    <img
                      class="icon filter-failed"
                      src="@/assets/icon/xmark.svg"
                      alt="check"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 border-section">
          <div class="row align-items-start tablet-gap">
            <div class="col-12">
              <TextBase
                :is-sub-title="true"
                :is-bold="true"
                :is-color="'primary-orange'"
                :text="'Summary'"
              />
              <TextBase
                :is-mini-divider="true"
                :is-detail="true"
                :is-color="'black-mute'"
                :text="'10 items purchased'"
              />
              <TextBase
                :is-detail="true"
                :is-bold="true"
                :is-color="'black'"
                :text="'Delivery estimation'"
              />
              <TextBase
                :is-mini-divider="true"
                :is-bold="true"
                :is-color="'success'"
                :text="'today by GO-SEND'"
              />
              <TextBase
                :is-detail="true"
                :is-bold="true"
                :is-color="'black'"
                :text="'Payment Method'"
              />
              <TextBase
                :custom-class="'mb-4'"
                :is-bold="true"
                :is-color="'success'"
                :text="'Bank Transfer'"
              />
            </div>
          </div>
          <div class="row align-content-end tablet-gap">
            <div class="d-contents">
              <div class="col-6">
                <TextBase
                  :custom-class="'mt-2'"
                  :is-color="'black-mute'"
                  :text="'cost of goods'"
                />
              </div>
              <div class="col-6 text-right">
                <TextBase
                  :custom-class="'mt-2'"
                  :is-color="'black'"
                  :text="formatCurrency(500000)"
                />
              </div>
            </div>
            <div class="d-contents">
              <div class="col-8">
                <TextBase
                  :custom-class="'mt-2'"
                  :is-color="'black-mute'"
                  :text="'Dropshipping fee'"
                />
              </div>
              <div class="col-4 text-right">
                <TextBase
                  :custom-class="'mt-2'"
                  :is-color="'black'"
                  :text="formatCurrency(5900)"
                />
              </div>
            </div>
            <div class="d-contents">
              <div class="col-8">
                <TextBase :is-custom-slot="true">
                  <p class="black-mute mt-2">
                    <span class="black">GO-SEND</span> shipment
                  </p>
                </TextBase>
              </div>
              <div class="col-4 text-right">
                <TextBase
                  :custom-class="'mt-2'"
                  :is-color="'black'"
                  :text="formatCurrency(15000)"
                />
              </div>
            </div>
            <div class="d-contents">
              <div class="col-8">
                <TextBase
                  :custom-class="'mt-4'"
                  :is-sub-title="true"
                  :is-color="'primary-orange'"
                  :text="'Total'"
                />
              </div>
              <div class="col-4 text-right">
                <TextBase
                  :custom-class="'mt-4'"
                  :is-sub-title="true"
                  :is-color="'primary-orange'"
                  :text="formatCurrency(505900)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { formatCurrency } from "../utils/common";
import InputCheckbox from "../components/base/InputCheckbox.vue";
import TextBase from "../components/base/TextBase.vue";

let isDropshipper = ref(false);
let isTrue = ref(false);
</script>

<style lang="css" scoped>
.border-section {
  border-top: solid 1px var(--primary-text-orange);
  margin: var(--padding-gap) 0px;
}

.tablet-gap {
  padding-top: calc(var(--gap) * 1.5);
}

label,
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

.input-wrapper .input-field input {
  width: 85%;
  border: none;
  -webkit-appearance: none;
  cursor: text;
}

input:placeholder-shown + label {
  color: var(--vt-c-black-mute);
  cursor: text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: translate(0, 0.75em) scale(1);
}

.input-wrapper .input-field input:focus::-webkit-input-placeholder {
  opacity: 1;
}

input:not(:placeholder-shown) + label,
input:focus + label {
  transform-origin: left bottom;
  transform: translateY(0) scale(0.75);
  cursor: pointer;
}

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

@media (min-width: 768px) {
  .border-section {
    border-top: none;
    border-left: solid 1px var(--primary-text-orange);
    margin: var(--padding-gap) 0px;
  }

  .tablet-gap {
    padding-top: 0px;
    padding-left: calc(var(--gap) * 1.5);
  }
}
</style>
