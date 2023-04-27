export declare class GuxTextLabelLegacy {
  private root;
  labeledComponent: HTMLDivElement;
  /**
   * The string of text to use for the label.  If the 'label' slot is
   * provided, that dom will be used instead of this property.
   */
  label: string;
  /**
   * The position of the label relative to its contained element.
   */
  position: 'above' | 'beside';
  id: string;
  constructor();
  componentWillLoad(): void;
  componentDidLoad(): void;
  render(): any;
  private generateId;
}
