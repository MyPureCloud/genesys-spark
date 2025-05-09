export const renderConfigs = [
  {
    description: 'should render small modal',
    html: `
          <gux-modal-legacy size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
  },
  {
    description: 'should render medium modal',
    html: `
          <gux-modal-legacy size="medium">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
  },
  {
    description: 'should render large modal',
    html: `
          <gux-modal-legacy size="large">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
  },
  {
    description: 'should render modal without a title',
    html: `
          <gux-modal-legacy size="large">
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
  },
  {
    description: 'should render modal without buttons',
    html: `
          <gux-modal-legacy size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
          </gux-modal-legacy>
        `
  },
  {
    description: 'should render modal with just left align buttons',
    html: `
          <gux-modal-legacy size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
          </gux-modal-legacy>
        `
  },
  {
    description: 'should render modal with just right align buttons',
    html: `
          <gux-modal-legacy size="small">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
  },
  {
    description: 'should render modal with a specified initial focus element',
    html: `
          <gux-modal-legacy initial-focus="#cancelButton">
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button id="cancelButton">Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
  },
  {
    description: 'should render small modal by default',
    html: `
          <gux-modal-legacy>
            <div slot="title">Modal Title</div>
            <div slot="content">This contains the modal content.</div>
            <div slot="left-align-buttons">
                <gux-button>Cancel</gux-button>
            </div>
            <div slot="right-align-buttons">
              <gux-button accent='primary'>Accept</gux-button>
            </div>
          </gux-modal-legacy>
        `
  }
];

export const renderConfig = renderConfigs[0];
