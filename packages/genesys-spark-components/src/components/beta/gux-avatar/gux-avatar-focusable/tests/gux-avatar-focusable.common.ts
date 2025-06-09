export const renderConfigs = [
  {
    description: 'renders as expected with slotted button',
    html: `<gux-avatar-focusable-beta>
        <button>
          <gux-avatar-beta name="Conor Darcy"></gux-avatar-beta>
        </button>
      </gux-avatar-focusable-beta>`
  },
  {
    description: 'renders as expected with slotted link',
    html: `<gux-avatar-focusable-beta>
        <a href="#">
          <gux-avatar-beta name="Conor Darcy"></gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>`
  },
  {
    description: 'renders as expected with slotted gux-avatar-change-photo',
    html: `<gux-avatar-focusable-beta>
        <gux-avatar-change-photo-beta>
          <gux-avatar-beta slot="avatar" name="Conor Darcy"></gux-avatar-beta>
        </gux-avatar-change-photo-beta>
      </gux-avatar-focusable-beta>`
  }
];
