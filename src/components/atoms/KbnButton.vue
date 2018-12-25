<template>
  <button
    v-bind:class="classes"
    v-bind:disabled="disabled"
    v-on:click="handleClick"
    type="button">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'KbnButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      const cls = this.type === 'text' ? '-text' : ''
      return [`kbn-button${cls}`]
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>
.kbn-button {
  padding: 0.6em 1.3em;
}
.kbn-button-text {
  border: none;
  padding-right: 0;
  padding-left: 0;
}
</style>
