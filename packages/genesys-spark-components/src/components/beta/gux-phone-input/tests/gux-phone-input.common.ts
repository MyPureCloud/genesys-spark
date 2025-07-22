export const renderConfigs = [
  {
    description: 'should render phone-input',
    html: `
        <gux-phone-input-beta></gux-phone-input-beta>
        `
  },
  {
    description: 'should render with default region',
    html: `<gux-phone-input-beta default-region="US"></gux-phone-input-beta>`
  },
  {
    description: 'should render with value',
    html: `<gux-phone-input-beta value="+13175971660"></gux-phone-input-beta>`
  },
  {
    description: 'should render with e164 format',
    html: `<gux-phone-input-beta phone-number-format="E164"></gux-phone-input-beta>`
  },
  {
    description: 'should render with international format',
    html: `<gux-phone-input-beta phone-number-format="INTERNATIONAL"></gux-phone-input-beta>`
  },
  {
    description: 'should render with toll-free type',
    html: `<gux-phone-input-beta phone-number-type="TOLL_FREE"></gux-phone-input-beta>`
  }
];
