<template>
  <div>
    <span>获取验证码({{ time }}s)</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
// countdown
let time = ref<number>(5);
let props = defineProps(["flag"]);
let $emit = defineEmits(["getFlag"]);
watch(
  () => props.flag,
  () => {
    // start countdown
    let timer = setInterval(() => {
      time.value--;
      if (time.value == 0) {
        // remove countdown
        clearInterval(timer);
        $emit("getFlag", false);
      }
    }, 1000);
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
