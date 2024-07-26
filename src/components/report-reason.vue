<template>
  <h3>{{ title }}</h3>
  <n-radio-group :value="modelValue" @update:value="onUpdateValue">
    <n-flex vertical>
      <n-radio v-for="reason in reasons" :key="reason.value" :value="reason.value">
        {{ reason.label }}
      </n-radio>
    </n-flex>
  </n-radio-group>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  reasons: {
    label: string,
    value: number
  }[],
  title: string,
  modelValue: number
}>();

const emit = defineEmits(['update:modelValue']);

const onUpdateValue = (newValue: number) => {
  emit('update:modelValue', newValue);
};
</script>

<style scoped lang="less">
</style>
