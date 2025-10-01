export const renderConfigs = [
  {
    description:
      'should render modal with separate button slots (to be deprecated)',
    html: `
      <gux-modal size="small" open>
        <div slot="title">Modal Titlezzzzzzz</div>
        <div slot="content">This contains the modal content.</div>
        <div slot="start-align-buttons">
            <gux-button-slot><button>Cancel</button></gux-button-slot>
        </div>
        <div slot="end-align-buttons">
            <gux-button-slot accent='primary'><button>Accept</button></gux-button-slot>
        </div>
      </gux-modal>
    `
  },
  {
    description:
      'should render modal with just left align buttons (to be deprecated)',
    html: `
      <gux-modal size="small" open>
        <div slot="title">Modal Title</div>
        <div slot="content">This contains the modal content.</div>
        <div slot="start-align-buttons">
            <gux-button-slot><button>Cancel</button></gux-button-slot>
        </div>
      </gux-modal>
      `
  },
  {
    description:
      'should render modal with just right align buttons (to be deprecated)',
    html: `
      <gux-modal size="small" open>
        <div slot="title">Modal Title</div>
        <div slot="content">This contains the modal content.</div>
        <div slot="end-align-buttons">
            <gux-button-slot accent='primary'><button>Accept</button></gux-button-slot>
        </div>
      </gux-modal>`
  },
  {
    description: 'should render small modal',
    html: `
      <gux-modal lang="en" size="small" open>
        <div slot="title">Modal Title</div>
        <div slot="content">This contains the modal content.</div>
        <gux-cta-group slot="footer" align="end">
            <gux-button slot="primary">Primary</gux-button>
            <gux-button slot="dismiss">Cancel</gux-button>
        </gux-cta-group>
      </gux-modal>
      `
  },
  {
    description: 'should render medium modal',
    html: `
      <gux-modal lang="en" size="medium" open>
      <div slot="title">Modal Title</div>
      <div slot="content">This contains the modal content.</div>
      <gux-cta-group slot="footer" align="end">
          <gux-button slot="primary">Primary</gux-button>
          <gux-button slot="dismiss">Cancel</gux-button>
      </gux-cta-group>
      </gux-modal>
    `
  },
  {
    description: 'should render large modal',
    html: `
      <gux-modal lang="en" size="large" open>
        <div slot="title">Modal Title</div>
        <div slot="content">This contains the modal content.</div>
        <gux-cta-group slot="footer" align="end">
            <gux-button slot="primary">Primary</gux-button>
            <gux-button slot="dismiss">Cancel</gux-button>
        </gux-cta-group>
      </gux-modal>
    `
  },
  {
    description: 'should render modal without a title',
    html: `
      <gux-modal lang="en" size="large" open>
        <div slot="content">This contains the modal content.</div>
        <gux-cta-group slot="footer" align="end">
            <gux-button slot="primary">Primary</gux-button>
            <gux-button slot="dismiss">Cancel</gux-button>
        </gux-cta-group>
      </gux-modal>
    `
  },
  {
    description: 'should render modal without buttons',
    html: `
      <gux-modal lang="en" size="small" open>
        <div slot="title">Modal Title</div>
        <div slot="content">This contains the modal content.</div>
      </gux-modal>
    `
  },
  {
    description: 'should render small modal by default',
    html: `
      <gux-modal lang="en" open>
        <div slot="title">Modal Title</div>
        <div slot="content">This contains the modal content.</div>
        <gux-cta-group slot="footer" align="end">
            <gux-button slot="primary">Primary</gux-button>
            <gux-button slot="dismiss">Cancel</gux-button>
        </gux-cta-group>
      </gux-modal>
    `
  }
];
