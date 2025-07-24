export const renderConfigs = [
  {
    description: 'renders simple radio selector cards',
    html: `
      <gux-selector-cards-beta>
        <gux-selector-card-beta variant="simple">
          <label slot="label" for="first">First</label>
          <input slot="input" id="first" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="second">Second</label>
          <input slot="input" id="second" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="third">Third</label>
          <input slot="input" id="third" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="fourth">Fourth</label>
          <input slot="input" id="fourth" type="radio" name="example1" disabled />
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="fifth">Fifth</label>
          <input slot="input" id="fifth" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>
      </gux-selector-cards-beta>
      `
  },
  {
    description: 'renders descriptive radio selector cards',
    html: `<gux-selector-cards-beta class="example2">
        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="first">First</label>
          <input slot="input" id="first" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="second">Second</label>
          <input slot="input" id="second" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="third">Third</label>
          <input slot="input" id="third" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="fourth">Fourth</label>
          <input slot="input" id="fourth" type="radio" name="example2" disabled />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="fifth">Fifth</label>
          <input slot="input" id="fifth" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>
      </gux-selector-cards-beta>`
  },
  {
    description: 'renders simple checkbox selector cards',
    html: `<gux-selector-cards-beta class="example1">
            <gux-selector-card-beta variant="simple">
              <label slot="label" for="1-D">First</label>
              <input slot="input" id="1-D" type="checkbox" name="example4" value="1-D" />
              <span slot="description"
                >A label for a sample selector card. Used in Spark WCL.</span
              >
              <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
            </gux-selector-card-beta>

            <gux-selector-card-beta variant="simple">
              <label slot="label" for="2-D">Second</label>
              <input slot="input" id="2-D" type="checkbox" name="example4" value="2-D" />
              <span slot="description"
                >A label for a sample selector card. Used in Spark WCL.</span
              >
              <gux-badge slot="badge" bold>Badge</gux-badge>
              <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
            </gux-selector-card-beta>

            <gux-selector-card-beta variant="simple">
              <label slot="label" for="3-D">Third</label>
              <input slot="input" id="3-D" type="checkbox" name="example4" value="3-D" />
              <span slot="description"
                >A label for a sample selector card. Used in Spark WCL.</span
              >
              <gux-badge slot="badge" bold>Badge</gux-badge>
              <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
            </gux-selector-card-beta>

            <gux-selector-card-beta variant="simple">
              <label slot="label" for="4-D">Fourth</label>
              <input slot="input" id="4-D" type="checkbox" name="example4" disabled value="4-D" />
              <span slot="description"
                >A label for a sample selector card. Used in Spark WCL.</span
              >
              <gux-badge slot="badge" bold>Badge</gux-badge>
              <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
            </gux-selector-card-beta>

            <gux-selector-card-beta variant="simple">
              <label slot="label" for="5-D">Fifth</label>
              <input slot="input" id="5-D" type="checkbox" name="example4" value="5-D" />
              <span slot="description"
                >A label for a sample selector card. Used in Spark WCL.</span
              >
              <gux-badge slot="badge" bold>Badge</gux-badge>
              <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
            </gux-selector-card-beta>
          </gux-selector-cards-beta>`
  },
  {
    description: 'renders descriptive checkbox selector cards',
    html: `<gux-selector-cards-beta class="example1">
      <gux-selector-card-beta variant="descriptive">
        <label slot="label" for="1-D">First</label>
        <input slot="input" id="1-D" type="checkbox" name="example4" value="1-D" />
        <span slot="description"
          >A label for a sample selector card. Used in Spark WCL.</span
        >
        <gux-badge slot="badge" bold>Badge</gux-badge>
        <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
      </gux-selector-card-beta>

      <gux-selector-card-beta variant="descriptive">
        <label slot="label" for="2-D">Second</label>
        <input slot="input" id="2-D" type="checkbox" name="example4" value="2-D" />
        <span slot="description"
          >A label for a sample selector card. Used in Spark WCL.</span
        >
        <gux-badge slot="badge" bold>Badge</gux-badge>
        <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
      </gux-selector-card-beta>

      <gux-selector-card-beta variant="descriptive">
        <label slot="label" for="3-D">Third</label>
        <input slot="input" id="3-D" type="checkbox" name="example4" value="3-D" />
        <span slot="description"
          >A label for a sample selector card. Used in Spark WCL.</span
        >
        <gux-badge slot="badge" bold>Badge</gux-badge>
        <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
      </gux-selector-card-beta>

      <gux-selector-card-beta variant="descriptive">
        <label slot="label" for="4-D">Fourth</label>
        <input slot="input" id="4-D" type="checkbox" name="example4" disabled value="4-D" />
        <span slot="description"
          >A label for a sample selector card. Used in Spark WCL.</span
        >
        <gux-badge slot="badge" bold>Badge</gux-badge>
        <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
      </gux-selector-card-beta>

      <gux-selector-card-beta variant="descriptive">
        <label slot="label" for="5-D">Fifth</label>
        <input slot="input" id="5-D" type="checkbox" name="example4" value="5-D" />
        <span slot="description"
          >A label for a sample selector card. Used in Spark WCL.</span
        >
        <gux-badge slot="badge" bold>Badge</gux-badge>
        <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
      </gux-selector-card-beta>
    </gux-selector-cards-beta>`
  }
];
