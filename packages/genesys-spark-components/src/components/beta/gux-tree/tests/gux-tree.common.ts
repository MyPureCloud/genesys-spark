export const renderConfig = {
  description: `should render as expected`,
  html: `
    <gux-tree-beta>
      <gux-branch>
        <div slot="label">Projects</div>
        <gux-leaf>
          <div slot="label"> Project-1 </div>
        </gux-leaf>
        <gux-leaf>
          <div slot="label"> Project-2 </div>
        </gux-leaf>
      </gux-branch>
      <gux-branch>
        <div slot="label">Reports</div>
        <gux-branch>
          <div slot="label">2025</div>
          <gux-leaf>
            <div slot="label"> doc 1 </div>
          </gux-leaf>
          <gux-leaf>
            <div slot="label"> doc 2 </div>
          </gux-leaf>
          <gux-leaf>
            <div slot="label"> doc 3 </div>
          </gux-leaf>
        </gux-branch>
        <gux-branch>
          <div slot="label">2024</div>
        </gux-branch>
      </gux-branch>
      <gux-leaf>
        <div slot="label"> Untitled Documents </div>
      </gux-leaf>
    </gux-tree-beta>
  `
};

export const renderConfigs = [renderConfig];
