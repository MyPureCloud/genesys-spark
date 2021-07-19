<template>
  <div id="app" lang="en">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import { registerElements } from '@genesys/common-webcomponents';
registerElements();

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
