<template>
  <div class="container">
    <gux-form-field>
      <input
        slot="input"
        name="errorInput"
        type="text"
        step="5"
        min="5"
        max="100"
        placeholder="Enter text"
      />
      <label slot="label">Label</label>
      <span v-if="hasError" slot="error">Field is required</span>
    </gux-form-field>

    <gux-button v-on:click="toggleHasError">Toggle Has Error</gux-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: function () {
    return {
      hasError: false
    }
  },
  methods: {
    toggleHasError: function () {
      this.hasError = !this.hasError;
    }
  }
}
</script>

<style scoped>
  .container {
    border: 1px solid black;
    padding: 20px;
  }
</style>
