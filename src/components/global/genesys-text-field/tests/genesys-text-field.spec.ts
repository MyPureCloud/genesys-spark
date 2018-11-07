import { GenesysTextField } from '../genesys-text-field';

describe('genesys-text-field', () => {
  it('builds', () => {
    const component = new GenesysTextField();
    expect(component).toBeTruthy();
    expect(component.render()).toBeTruthy();
    component.value = 'value';
    component.errorMessage = 'error';
    expect(component.render()).toBeTruthy();
  });
  describe('updateClassList', () => {
    it('should correctly set the list', () => {
      const component = new GenesysTextField();
      expect(component.classList.length).toBe(0);
      component.updateClassList(false);
      expect(component.classList.length).toBe(0);
      component.errorMessageType = 'error';
      component.errorMessage = 'an error occured';
      component.updateClassList(true);
      expect(component.classList.length).toBe(1);
      component.label = 'label';
      component.updateClassList(true);
      expect(component.classList.length).toBe(2);
    })
  });
  describe('componentDidLoad', () => {
    it('should create set internalErrorMessage', () => {
      const component = new GenesysTextField();
      component.errorMessage = 'error';
      component.componentDidLoad();
      expect(component.internalErrorMessage).toBe('error');
    });
  });
  describe('getIconByMessageType', () => {
    it('should return the correct message type', () => {
      const component = new GenesysTextField();
      component.errorMessage = 'error';
      component.componentDidLoad();
      expect(component.getIconByMessageType('sss')).toBe('genesys-icon-alert-octo');
      expect(component.getIconByMessageType('warning')).toBe('genesys-icon-alert-triangle');
      expect(component.getIconByMessageType('error')).toBe('genesys-icon-alert-octo');
    });
  });
  describe('clear', () => {
    it('should clear value', () => {
      const component = new GenesysTextField();
      component.inputElement = {value: 'test', focus: () => 'test'};
      component.value = 'value';
      component.clear();
      expect(component.value).toBe('');
    });
  });
  describe('_testValue', () => {
    it('should do nothing if no validation prop has been set', () => {
      const component = new GenesysTextField();
      const myMock = jest.fn();
      component.updateClassList = myMock;
      component._testValue('test');
      expect(component.errorMessage).toBe('');
      expect(component.errorMessageType).toBe('error');
      expect(myMock.mock.calls.length).toBe(1);
    });
    it('should correctly call validation regexp', () => {
      const component = new GenesysTextField();
      const myMock = jest.fn();
      component.updateClassList = myMock;
      component.validation = new RegExp('[aA-zZ]+');
      component.internalErrorMessage = 'error Message';
      component._testValue('test');
      expect(component.errorMessage).toBe('');
      expect(component.errorMessageType).toBe('error');
      expect(myMock.mock.calls.length).toBe(1);
      component._testValue(' ');
      expect(component.errorMessage).toBe('error Message');
      expect(component.errorMessageType).toBe('error');
      expect(myMock.mock.calls.length).toBe(2);
    });
    it('should correctly call validation function', () => {
      const component = new GenesysTextField();
      const myMock = jest.fn();
      component.updateClassList = myMock;
      component.validation = () => false;
      component.internalErrorMessage = 'error Message';
      component._testValue('test');
      expect(component.errorMessage).toBe('error Message');
      expect(component.errorMessageType).toBe('error');
      expect(myMock.mock.calls.length).toBe(1);
      component.validation = () => ({});
      component._testValue('test');
      expect(component.errorMessage).toBe('');
      expect(component.errorMessageType).toBe('error');
      expect(myMock.mock.calls.length).toBe(2);
      component.validation = () => ({error: 'blop'});
      component._testValue('test');
      expect(component.errorMessage).toBe('blop');
      expect(component.errorMessageType).toBe('error');
      expect(myMock.mock.calls.length).toBe(3);
      component.validation = () => ({warning: 'blop'});
      component._testValue('test');
      expect(component.errorMessage).toBe('blop');
      expect(component.errorMessageType).toBe('warning');
      expect(myMock.mock.calls.length).toBe(4);
    });
  });
});