<template>
  <div>
    <Child ref="child"></Child>
  </div>
</template>

<script>
import Child from './Child.vue';
export default {
  name: 'Parent',
  data: function () {
    return {
      childComp: null
    };
  },
  methods: {
    async initComponent() {
      await this.childComp.initComponent({ test: 'ccc' });
    }
  },
  async mounted() {
    this.childComp = this.$refs.child;
    await this.initComponent();
  },
  components: { Child }
};
</script>

<style></style>
