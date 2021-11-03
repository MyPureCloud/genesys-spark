<template>
  <div id="app" lang="en">
      <link
      href="http://localhost:8080/genesys-webcomponents/genesys-webcomponents.css"
      rel="stylesheet"
    />

    <script
      type="module"
      src="http://localhost:8080/genesys-webcomponents/genesys-webcomponents.esm.js"
    ></script>

    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
