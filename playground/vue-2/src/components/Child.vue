<template>
  <div class="container">
    <gux-dropdown
      id="dropdownTest"
      label-position="top"
      :value="uiEntity.test"
      :key="magicKey"
      @change="updateEntity">
        <gux-listbox aria-label="test">
          <gux-option v-for="item in dropDownItems" :key="item.text" :value ="item.text">{{item.text}}</gux-option>
        </gux-listbox>
      </gux-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Child',
  data: function () {
    return {
      uiEntity: {test: ''},
      magicKey: 0,
      dropDownItems: [{text: ''}]
    }
  },
  methods: {
    updateEntity: function (event) {
      this.uiEntity.test = event.target.value;
    },
    async initComponent(entity) {
        await this.initDropdown();
        this.uiEntity = {test: entity.test};
    },
    async initDropdown() {
        let options = [];
        await new Promise(res => {
        setTimeout(() => res(['aaa','bbb','ccc']), 1000);
        })
        .then(values => {
            options = values;
        });
        this.dropDownItems = options.map(function(x) { return {text: x}});
        this.updateDropDownOptions();
    },
    async updateDropDownOptions() {
        this.magicKey = this.magicKey > 0 ? -1 : 1;
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
