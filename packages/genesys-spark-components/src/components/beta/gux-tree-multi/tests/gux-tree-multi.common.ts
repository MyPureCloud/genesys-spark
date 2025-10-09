export const renderConfig = {
  description: `should render as expected`,
  disableA11yCheck: true,
  html: `
    <gux-tree-multi-beta>
      <gux-branch-multi value="projects">
        <div slot="label">Projects</div>
        <gux-leaf-multi value="project1">
          <div slot="label"> Project-1 </div>
        </gux-leaf-multi>
        <gux-leaf-multi value="project2">
          <div slot="label"> Project-2 </div>
        </gux-leaf-multi>
      </gux-branch-multi>
      <gux-branch-multi value="reports">
        <div slot="label">Reports</div>
        <gux-branch-multi value="2025">
          <div slot="label">2025</div>
          <gux-leaf-multi value="doc1">
            <div slot="label"> doc 1 </div>
          </gux-leaf-multi>
          <gux-leaf-multi value="doc2">
            <div slot="label"> doc 2 </div>
          </gux-leaf-multi>
          <gux-leaf-multi value="doc3">
            <div slot="label"> doc 3 </div>
          </gux-leaf-multi>
        </gux-branch-multi>
        <gux-branch-multi value="2024">
          <div slot="label">2024</div>
        </gux-branch-multi>
      </gux-branch-multi>
      <gux-leaf-multi value="untitled">
        <div slot="label"> Untitled Documents </div>
      </gux-leaf-multi>
    </gux-tree-multi-beta>
  `
};

export const renderConfigs = [renderConfig];
