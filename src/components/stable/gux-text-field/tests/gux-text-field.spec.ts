import { newSpecPage } from '@stencil/core/testing';
import { GuxTextField } from '../gux-text-field';

describe('gux-text-field', () => {
  let component: GuxTextField;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTextField],
      html: `<gux-text-field></gux-text-field>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxTextField);
  });

  describe('Class Logic', () => {
    describe('getClassList', () => {
      it('should correctly set the list', () => {
        expect(component.getClassList().length).toBe(0);
        component.errorMessageType = 'error';
        component.errorMessage = 'an error occured';
        expect(component.getClassList().split(' ').length).toBe(1);
      });
    });

    describe('componentWillLoad', () => {
      it('should create set internalErrorMessage', async () => {
        component.errorMessage = 'error';
        await component.componentWillLoad();
        expect(component.internalErrorMessage).toBe('error');
      });
    });

    describe('getIconByMessageType', () => {
      it('should return the correct message type', () => {
        component.errorMessage = 'error';
        component.componentDidLoad();
        expect(component.getIconByMessageType('sss')).toBe('ic-alert-octo');
        expect(component.getIconByMessageType('warning')).toBe(
          'ic-alert-triangle'
        );
        expect(component.getIconByMessageType('error')).toBe('ic-alert-octo');
      });
    });

    describe('clear', () => {
      it('should clear value', () => {
        component.inputElement = ({
          focus: () => 'test',
          value: 'test'
        } as unknown) as HTMLInputElement;
        component.value = 'value';
        component.clear();
        expect(component.value).toBe('');
      });
    });

    describe('_testValue', () => {
      it('should do nothing if no validation prop has been set', () => {
        component._testValue('test');
        expect(component.errorMessage).toBe('');
        expect(component.errorMessageType).toBe('error');
      });

      it('should correctly call validation regexp', () => {
        component.validation = new RegExp('[aA-zZ]+');
        component.internalErrorMessage = 'error Message';
        component._testValue('test');
        expect(component.errorMessage).toBe('');
        expect(component.errorMessageType).toBe('error');
        component._testValue(' ');
        expect(component.errorMessage).toBe('error Message');
        expect(component.errorMessageType).toBe('error');
      });

      it('should correctly call validation function', () => {
        component.validation = () => false;
        component.internalErrorMessage = 'error Message';
        component._testValue('test');
        expect(component.errorMessage).toBe('error Message');
        expect(component.errorMessageType).toBe('error');
        component.validation = () => ({});
        component._testValue('test');
        expect(component.errorMessage).toBe('');
        expect(component.errorMessageType).toBe('error');
        component.validation = () => ({ error: 'blop' });
        component._testValue('test');
        expect(component.errorMessage).toBe('blop');
        expect(component.errorMessageType).toBe('error');
        component.validation = () => ({ warning: 'blop' });
        component._testValue('test');
        expect(component.errorMessage).toBe('blop');
        expect(component.errorMessageType).toBe('warning');
      });
    });
  });
});
