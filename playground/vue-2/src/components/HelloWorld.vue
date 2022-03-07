<template>
  <div class="container">
    <gux-form-field clearable>
      <input
        slot="input"
        name="errorInput"
        type="text"
        placeholder="Enter text"
        v-model="message1"
      />
      <label slot="label">gux-form-field</label>
      <span slot="error" v-if="message1 === ''">Field is required</span>
    </gux-form-field>

    <gux-form-field-text-like-beta clearable>
      <input
        slot="input"
        name="errorInput"
        type="text"
        placeholder="Enter text"
        v-model="message2"
      />
      <label slot="label">gux-form-field-text-like-beta</label>
      <span slot="error" v-if="message2 === ''">Field is required</span>
    </gux-form-field-text-like-beta>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: function () {
    return {
      message1: 'Sample text',
      message2: 'Sample text'
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
