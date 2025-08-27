export const renderConfig = {
  description: 'should render popover',
  html: `<div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover position="top" for="popover-target" is-open>
          <span slot="title">Title</span>
          <div>popover content</div>
          <div slot="footer">footer content</div>
        </gux-popover>
      </div>`
};
