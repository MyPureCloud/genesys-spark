global.beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});

global.afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore();
});
