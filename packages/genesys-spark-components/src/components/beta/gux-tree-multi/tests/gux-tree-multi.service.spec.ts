import {
  setInitialActiveNode,
  setFirstNodeActive,
  setLastNodeActive,
  setNextNodeActive,
  setPreviousNodeActive,
  setParentNodeActive,
  setChildNodeActive,
  toggleNodeSelection,
  setSelectedNodesByValue,
  expandSelectedNodes,
  handleTreeNodeSpecificEvent
} from '../gux-tree-multi.service';

// Mock the whenEventIsFrom utility
jest.mock('@utils/dom/when-event-is-from');

describe('gux-tree-multi.service', () => {
  let mockTree: HTMLGuxTreeMultiBetaElement;
  let mockLeaf1: HTMLGuxLeafMultiElement;
  let mockLeaf2: HTMLGuxLeafMultiElement;
  let mockBranch: HTMLGuxBranchMultiElement;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create leaf nodes
    mockLeaf1 = {
      tagName: 'GUX-LEAF-MULTI',
      value: 'leaf1',
      disabled: false,
      filtered: false,
      active: false,
      selected: false,
      id: 'leaf1-id',
      scrollIntoView: jest.fn(),
      parentElement: {
        closest: jest.fn()
      }
    } as unknown as HTMLGuxLeafMultiElement;

    mockLeaf2 = {
      tagName: 'GUX-LEAF-MULTI',
      value: 'leaf2',
      disabled: false,
      filtered: false,
      active: false,
      selected: false,
      id: 'leaf2-id',
      scrollIntoView: jest.fn(),
      parentElement: {
        closest: jest.fn()
      }
    } as unknown as HTMLGuxLeafMultiElement;

    // Create branch node
    mockBranch = {
      tagName: 'GUX-BRANCH-MULTI',
      value: 'branch1',
      disabled: false,
      filtered: false,
      active: false,
      selected: false,
      indeterminate: false,
      expanded: true,
      id: 'branch1-id',
      children: [mockLeaf1, mockLeaf2],
      scrollIntoView: jest.fn(),
      contains: jest.fn(),
      parentElement: {
        closest: jest.fn()
      }
    } as unknown as HTMLGuxBranchMultiElement;

    // Set up parent relationships
    mockLeaf1.parentElement.closest = jest.fn().mockReturnValue(mockBranch);
    mockLeaf2.parentElement.closest = jest.fn().mockReturnValue(mockBranch);
    mockBranch.contains = jest
      .fn()
      .mockImplementation(node => node === mockLeaf1 || node === mockLeaf2);

    // Create tree
    mockTree = {
      children: [mockBranch],
      setAttribute: jest.fn(),
      value: ''
    } as unknown as HTMLGuxTreeMultiBetaElement;

    // Mock Array.from to return the correct children
    jest.spyOn(Array, 'from').mockImplementation((arrayLike: any) => {
      if (arrayLike === mockTree.children) {
        return [mockBranch];
      }
      if (arrayLike === mockBranch.children) {
        return [mockLeaf1, mockLeaf2];
      }
      return [];
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#toggleNodeSelection', () => {
    it('should toggle node selection and update tree value', () => {
      toggleNodeSelection(mockTree, mockLeaf1);

      expect(mockLeaf1.selected).toBe(true);
      expect(mockTree.value).toBe('leaf1');
      expect(mockLeaf1.scrollIntoView).toHaveBeenCalledWith({
        block: 'nearest'
      });
    });

    it('should toggle selection off when already selected', () => {
      mockLeaf1.selected = true;
      mockTree.value = 'leaf1';

      toggleNodeSelection(mockTree, mockLeaf1);

      expect(mockLeaf1.selected).toBe(false);
      expect(mockTree.value).toBe('');
    });

    it('should handle multiple selections', () => {
      // Select first leaf
      toggleNodeSelection(mockTree, mockLeaf1);
      expect(mockTree.value).toBe('leaf1');

      // Select second leaf
      toggleNodeSelection(mockTree, mockLeaf2);
      expect(mockTree.value).toContain('leaf1');
      expect(mockTree.value).toContain('leaf2');
    });

    it('should update descendants when toggling branch selection', () => {
      toggleNodeSelection(mockTree, mockBranch);

      expect(mockBranch.selected).toBe(true);
      expect(mockLeaf1.selected).toBe(true);
      expect(mockLeaf2.selected).toBe(true);
      expect(mockTree.value).toContain('branch1');
      expect(mockTree.value).toContain('leaf1');
      expect(mockTree.value).toContain('leaf2');
    });
  });

  describe('#setSelectedNodesByValue', () => {
    it('should select nodes by comma-separated values', () => {
      setSelectedNodesByValue(mockTree, 'leaf1,leaf2');

      expect(mockLeaf1.selected).toBe(true);
      expect(mockLeaf2.selected).toBe(true);
    });

    it('should handle empty value', () => {
      mockLeaf1.selected = true;
      mockLeaf2.selected = true;

      setSelectedNodesByValue(mockTree, '');

      expect(mockLeaf1.selected).toBe(false);
      expect(mockLeaf2.selected).toBe(false);
    });

    it('should handle whitespace in values', () => {
      setSelectedNodesByValue(mockTree, ' leaf1 , leaf2 ');

      expect(mockLeaf1.selected).toBe(true);
      expect(mockLeaf2.selected).toBe(true);
    });
  });

  describe('#expandSelectedNodes', () => {
    it('should expand parent nodes of selected nodes', () => {
      const mockParentBranch = {
        expanded: false,
        parentElement: {
          closest: jest.fn().mockReturnValue(null)
        }
      };
      mockLeaf1.selected = true;
      mockLeaf1.parentElement.closest = jest
        .fn()
        .mockReturnValue(mockParentBranch);

      expandSelectedNodes(mockTree);

      expect(mockParentBranch.expanded).toBe(true);
    });
  });

  describe('#handleTreeNodeSpecificEvent', () => {
    it('should handle event delegation without errors', () => {
      const mockEvent = new Event('click');
      const onLeafSpy = jest.fn();
      const onBranchSpy = jest.fn();

      expect(() => {
        handleTreeNodeSpecificEvent({
          event: mockEvent,
          onLeaf: onLeafSpy,
          onBranch: onBranchSpy
        });
      }).not.toThrow();
    });
  });

  describe('#setInitialActiveNode', () => {
    it('should set first selected node as active', () => {
      mockLeaf1.selected = true;

      setInitialActiveNode(mockTree);

      expect(mockLeaf1.active).toBe(true);
      expect(mockTree.setAttribute).toHaveBeenCalledWith(
        'aria-activedescendant',
        'leaf1-id'
      );
    });

    it('should set first available node as active when none selected', () => {
      setInitialActiveNode(mockTree);

      expect(mockBranch.active).toBe(true);
      expect(mockTree.setAttribute).toHaveBeenCalledWith(
        'aria-activedescendant',
        'branch1-id'
      );
    });
  });

  describe('#setFirstNodeActive', () => {
    it('should set first available node as active', () => {
      setFirstNodeActive(mockTree);

      expect(mockBranch.active).toBe(true);
      expect(mockLeaf1.active).toBe(false);
      expect(mockLeaf2.active).toBe(false);
    });
  });

  describe('#setLastNodeActive', () => {
    it('should set last available node as active', () => {
      setLastNodeActive(mockTree);

      expect(mockLeaf2.active).toBe(true);
      expect(mockLeaf1.active).toBe(false);
      expect(mockBranch.active).toBe(false);
      expect(mockLeaf2.scrollIntoView).toHaveBeenCalledWith({
        block: 'nearest'
      });
    });
  });

  describe('#setNextNodeActive', () => {
    it('should set next node as active', () => {
      mockLeaf1.active = true;

      setNextNodeActive(mockTree);

      expect(mockLeaf1.active).toBe(false);
      expect(mockLeaf2.active).toBe(true);
    });

    it('should wrap to first node when at end', () => {
      mockLeaf2.active = true;

      setNextNodeActive(mockTree);

      expect(mockLeaf2.active).toBe(false);
      expect(mockBranch.active).toBe(true);
    });
  });

  describe('#setPreviousNodeActive', () => {
    it('should set previous node as active', () => {
      mockLeaf2.active = true;

      setPreviousNodeActive(mockTree);

      expect(mockLeaf2.active).toBe(false);
      expect(mockLeaf1.active).toBe(true);
    });

    it('should wrap to last node when at beginning', () => {
      mockBranch.active = true;

      setPreviousNodeActive(mockTree);

      expect(mockBranch.active).toBe(false);
      expect(mockLeaf2.active).toBe(true);
    });
  });

  describe('#setParentNodeActive', () => {
    it('should set parent branch as active', () => {
      mockLeaf1.active = true;

      setParentNodeActive(mockTree);

      expect(mockBranch.active).toBe(true);
      expect(mockLeaf1.active).toBe(false);
    });
  });

  describe('#setChildNodeActive', () => {
    it('should set first child node as active when branch is expanded', () => {
      mockBranch.active = true;

      setChildNodeActive(mockTree);

      expect(mockLeaf1.active).toBe(true);
      expect(mockBranch.active).toBe(false);
    });
  });

  describe('branch state management', () => {
    it('should set branch to indeterminate when some children are selected', () => {
      // Select only one child
      toggleNodeSelection(mockTree, mockLeaf1);

      // Branch should be indeterminate (not fully selected)
      expect(mockBranch.selected).toBe(false);
      expect(mockBranch.indeterminate).toBe(true);
    });

    it('should set branch to selected when all children are selected', () => {
      // Select both children
      toggleNodeSelection(mockTree, mockLeaf1);
      toggleNodeSelection(mockTree, mockLeaf2);

      // Branch should be fully selected
      expect(mockBranch.selected).toBe(true);
      expect(mockBranch.indeterminate).toBe(false);
    });

    it('should clear branch selection when no children are selected', () => {
      // First select children
      mockLeaf1.selected = true;
      mockLeaf2.selected = true;
      mockBranch.selected = true;

      // Then deselect all children
      toggleNodeSelection(mockTree, mockLeaf1);
      toggleNodeSelection(mockTree, mockLeaf2);

      expect(mockBranch.selected).toBe(false);
      expect(mockBranch.indeterminate).toBe(false);
    });
  });
});
