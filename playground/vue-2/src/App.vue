<template>
  <div id="app" lang="en">
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
