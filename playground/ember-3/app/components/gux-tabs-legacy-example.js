import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class GuxTabsLegacyExample extends Component {
  @tracked tabs = [
    {
      title: 'Hello World 1',
      id: 'tab-1',
    },
    {
      title: 'Hello World 2',
      id: 'tab-2',
    },
    {
      title: 'Hello World 3',
      id: 'tab-3',
    },
    {
      title: 'Hello World 4',
      id: 'tab-4',
    },
    {
      title: 'Hello World 5',
      id: 'tab-5',
    },
  ];

  @action
  onSortChanged(event) {
    let orderArray = event.detail;
    this.tabs = this.tabs.slice().sort(function (a, b) {
      return orderArray.indexOf(a.id) - orderArray.indexOf(b.id);
    });
    console.log(this.tabs);
  }

  @action
  selectTabFive() {
    document.getElementById('tabsLegacy1').value = 'tab-5';
  }
  @action
  addNewTabToEnd() {
    this.tabs.pushObject({
      title: `Hello World ${this.tabs.length + 1}`,
      id: `tab-${this.tabs.length + 1}`,
    });
  }
  @action
  addNewTabToMiddle() {
    this.tabs.insertAt(3, {
      title: `Hello World ${this.tabs.length + 1}`,
      id: `tab-${this.tabs.length + 1}`,
    });
  }
  @action
  reverseTabOrder() {
    this.tabs.reverseObjects();
  }
}
