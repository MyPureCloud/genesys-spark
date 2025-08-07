export const renderConfig = {
  description: 'Should render as expected dropdown',
  html: `
    <gux-dropdown-multi lang="en">
      <gux-listbox-multi aria-label="Animals">
        <gux-option-multi value="a">Ant<span slot="subtext">Small</span></gux-option-multi>
        <gux-option-multi value="b">Bat</gux-option-multi>
        <gux-option-multi value="c">Cat</gux-option-multi>
        <gux-option-multi value="d">Dog</gux-option-multi>
        <gux-option-multi value="e">Eel</gux-option-multi>
        <gux-option-multi value="f">Frog</gux-option-multi>
        <gux-option-multi value="g">Goat</gux-option-multi>
        <gux-option-multi value="h">Horse<span slot="subtext">Large</span></gux-option-multi>
        <gux-option-multi value="i">Ibis</gux-option-multi>
      </gux-listbox-multi>
    </gux-dropdown-multi>
  `
};
