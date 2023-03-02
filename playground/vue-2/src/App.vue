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

    <!-- <link
      href="https://dhqbrvplips7x.cloudfront.net/common-ui-docs/genesys-webcomponents/3.41.3-585/genesys-webcomponents/genesys-webcomponents.css"
      rel="stylesheet"
    />

    <script
      type="module"
      src="https://dhqbrvplips7x.cloudfront.net/common-ui-docs/genesys-webcomponents/3.41.3-585/genesys-webcomponents/genesys-webcomponents.esm.js"
    ></script> -->

    <Parent />
  </div>
</template>

<!--
<template>
  <div id="app" lang="en">
    <Parent/>
  </div>
</template>
-->
<script>
import Parent from './components/Parent.vue';
export default {
  name: 'App',
  components: {
    Parent
  }
};
</script>
