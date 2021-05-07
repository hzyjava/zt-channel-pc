<template>
  <span>
    <a-input
      type="text"
      :value="number"
      @change="handleNumberChange"
      style="width: 63%; margin-right: 2%;"
    />
    <a-select
      :value="currency"
      style="width: 32%"
      @change="handleCurrencyChange"
    >
      <a-select-option value="rmb">RMB</a-select-option>
      <a-select-option value="dollar">Dollar</a-select-option>
    </a-select>
  </span>
</template>

<script>
export default {
  props: ['value'],
  data() {
    const value = this.value || {}
    return {
      number: value.number || 0,
      currency: value.currency || 'rmb'
    }
  },
  watch: {
    value(val = {}) {
      this.number = val.number || 0
      this.currency = val.currency || 'rmb'
    }
  },
  methods: {
    handleNumberChange(e) {
      const number = parseInt(e.target.value || 0, 10)
      if (isNaN(number)) {
        return
      }
      this.triggerChange({ number })
    },
    handleCurrencyChange(currency) {
      this.triggerChange({ currency })
    },
    triggerChange(changedValue) {
      // Should provide an event to pass value to Form.
      this.$emit('change', Object.assign({}, this.$data, changedValue))
    }
  }
}
</script>

<style></style>
