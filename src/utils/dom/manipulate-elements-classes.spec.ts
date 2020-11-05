import { JSDOM } from 'jsdom';

import {
  addClassToElements,
  removeClassToElements
} from './manipulate-elements-classes';

describe('manipulate elements classes', () => {
  let dom;
  let element1;
  let element2;
  let element3;
  let element4;
  let element5;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
         <title>JSDOM DOM</title>
        </head>
        <body>
          <div id="element-1" class="class-1 class-2"><div>
          <div id="element-2" class="class-1 class-2"><div>
          <div id="element-3" class="class-1 class-2"><div>
          <div id="element-4" class="class-1 class-2"><div>
          <div id="element-5" class="class-1 class-2"><div>
        </body>
      </html>
    `);

    element1 = dom.window.document.getElementById('element-1');
    element2 = dom.window.document.getElementById('element-2');
    element3 = dom.window.document.getElementById('element-3');
    element4 = dom.window.document.getElementById('element-4');
    element5 = dom.window.document.getElementById('element-5');
  });

  describe('#addClassToElements', () => {
    it('should add a class to an element', () => {
      expect(element1.classList.contains('class-1')).toBe(true);
      expect(element1.classList.contains('class-2')).toBe(true);
      expect(element1.classList.contains('class-3')).toBe(false);

      addClassToElements(element1, 'class-3');

      expect(element1.classList.contains('class-1')).toBe(true);
      expect(element1.classList.contains('class-2')).toBe(true);
      expect(element1.classList.contains('class-3')).toBe(true);
    });

    it('should add a class to an array of elements', () => {
      expect(element1.classList.contains('class-3')).toBe(false);
      expect(element2.classList.contains('class-3')).toBe(false);
      expect(element3.classList.contains('class-3')).toBe(false);
      expect(element4.classList.contains('class-3')).toBe(false);
      expect(element5.classList.contains('class-3')).toBe(false);

      addClassToElements(
        [element1, element2, element3, element4, element5],
        'class-3'
      );

      expect(element1.classList.contains('class-3')).toBe(true);
      expect(element2.classList.contains('class-3')).toBe(true);
      expect(element3.classList.contains('class-3')).toBe(true);
      expect(element4.classList.contains('class-3')).toBe(true);
      expect(element5.classList.contains('class-3')).toBe(true);
    });

    it('should handle an undefined input for elements', () => {
      expect(element1.classList.contains('class-3')).toBe(false);
      expect(element2.classList.contains('class-3')).toBe(false);
      expect(element3.classList.contains('class-3')).toBe(false);
      expect(element4.classList.contains('class-3')).toBe(false);
      expect(element5.classList.contains('class-3')).toBe(false);

      addClassToElements(undefined, 'class-3');

      expect(element1.classList.contains('class-3')).toBe(false);
      expect(element2.classList.contains('class-3')).toBe(false);
      expect(element3.classList.contains('class-3')).toBe(false);
      expect(element4.classList.contains('class-3')).toBe(false);
      expect(element5.classList.contains('class-3')).toBe(false);
    });
  });

  describe('#removeClassToElements', () => {
    it('should add a class to an element', () => {
      expect(element1.classList.contains('class-1')).toBe(true);
      expect(element1.classList.contains('class-2')).toBe(true);

      removeClassToElements(element1, 'class-2');

      expect(element1.classList.contains('class-1')).toBe(true);
      expect(element1.classList.contains('class-2')).toBe(false);
    });

    it('should add a class to an array of elements', () => {
      expect(element1.classList.contains('class-2')).toBe(true);
      expect(element2.classList.contains('class-2')).toBe(true);
      expect(element3.classList.contains('class-2')).toBe(true);
      expect(element4.classList.contains('class-2')).toBe(true);
      expect(element5.classList.contains('class-2')).toBe(true);

      removeClassToElements(
        [element1, element2, element3, element4, element5],
        'class-2'
      );

      expect(element1.classList.contains('class-2')).toBe(false);
      expect(element2.classList.contains('class-2')).toBe(false);
      expect(element3.classList.contains('class-2')).toBe(false);
      expect(element4.classList.contains('class-2')).toBe(false);
      expect(element5.classList.contains('class-2')).toBe(false);
    });

    it('should handle an undefined input for elements', () => {
      expect(element1.classList.contains('class-2')).toBe(true);
      expect(element2.classList.contains('class-2')).toBe(true);
      expect(element3.classList.contains('class-2')).toBe(true);
      expect(element4.classList.contains('class-2')).toBe(true);
      expect(element5.classList.contains('class-2')).toBe(true);

      removeClassToElements(undefined, 'class-2');

      expect(element1.classList.contains('class-2')).toBe(true);
      expect(element2.classList.contains('class-2')).toBe(true);
      expect(element3.classList.contains('class-2')).toBe(true);
      expect(element4.classList.contains('class-2')).toBe(true);
      expect(element5.classList.contains('class-2')).toBe(true);
    });
  });
});
