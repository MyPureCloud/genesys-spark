import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class GuxTabsExample extends Component {
  @tracked tabs = [
    {
      title: 'a',
      id: 'tab-a',
    },
    {
      title: 'b',
      id: 'tab-b',
    },
  ];

  @tracked isShown = false;

  panels = ['panel1', 'panel2'];
  activeTab = 'tab-b';

  @action
  showTabs() {
    this.isShown = !this.isShown;
  }

  @action
  activeTabChange(event) {
    console.log(event.detail);
  }
}
