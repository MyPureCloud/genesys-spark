<template>
  <div class="container">
    <gux-form-field-text-like>
      <input
        slot="input"
        name="errorInput"
        type="text"
        placeholder="Enter text"
      />
      <label slot="label">Label</label>
      <span slot="error" v-if="hasError">Field is required</span>
    </gux-form-field-text-like>
      <gux-form-field-dropdown>
        <gux-dropdown>
          <gux-listbox>
            <gux-option value="a" disabled>Ant</gux-option>
            <gux-option value="b">Bat</gux-option>
            <gux-option value="c">Cat</gux-option>
          </gux-listbox>
        </gux-dropdown>
        <label slot="label">Default</label>
        <span slot="error" v-if="hasError">Field is required</span>
    </gux-form-field-dropdown>

    <gux-button v-on:click="toggleHasError">Toggle Has Error</gux-button>
    <div>Has Error: {{hasError}}</div>
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
