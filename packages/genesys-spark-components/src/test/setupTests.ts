/* eslint-env jest, node */

global.beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});

global.afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore();
});

// Mock DataTransfer for drag and drop tests
class MockDataTransfer {
  data: Record<string, string> = {};
  files: FileList = Object.assign([], {
    item: () => null,
    namedItem: () => null
  });
  types: string[] = [];
  dropEffect: 'none' | 'copy' | 'link' | 'move' = 'none';
  effectAllowed:
    | 'none'
    | 'copy'
    | 'copyLink'
    | 'copyMove'
    | 'link'
    | 'linkMove'
    | 'move'
    | 'all'
    | 'uninitialized' = 'uninitialized';
  items: DataTransferItemList = Object.assign([], {
    add: () => null,
    remove: () => null,
    clear: () => null
  });

  setData(format: string, data: string): void {
    this.data[format] = data;
    if (!this.types.includes(format)) {
      this.types.push(format);
    }
  }

  getData(format: string): string {
    return this.data[format] || '';
  }

  clearData(): void {
    this.data = {};
    this.types = [];
  }

  setDragImage(): void {}
}

global['DataTransfer'] = MockDataTransfer;
