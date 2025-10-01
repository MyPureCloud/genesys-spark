import {
  setInitialActiveNode,
  setFirstNodeActive,
  setLastNodeActive,
  setNextNodeActive,
  setPreviousNodeActive,
  setParentNodeActive,
  setChildNodeActive,
  setSelectedNode,
  setSelectedNodeByValue,
  handleTreeNodeSpecificEvent
} from '../gux-tree.service';

// Mock the whenEventIsFrom utility
jest.mock('@utils/dom/when-event-is-from');

describe('gux-tree.service', () => {
  let mockTree: HTMLGuxTreeBetaElement;
  let mockLeaf1: HTMLGuxLeafElement;
  let mockLeaf2: HTMLGuxLeafElement;
  let mockBranch: HTMLGuxBranchElement;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create leaf nodes
    mockLeaf1 = {
      tagName: 'GUX-LEAF',
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
    } as unknown as HTMLGuxLeafElement;

    mockLeaf2 = {
      tagName: 'GUX-LEAF',
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
    } as unknown as HTMLGuxLeafElement;

    // Create branch node
    mockBranch = {
      tagName: 'GUX-BRANCH',
      value: 'branch1',
      disabled: false,
      filtered: false,
      active: false,
      selected: false,
      expanded: true,
      id: 'branch1-id',
      children: [mockLeaf1, mockLeaf2],
      scrollIntoView: jest.fn(),
      parentElement: {
        closest: jest.fn()
      }
    } as unknown as HTMLGuxBranchElement;

    // Set up parent relationships
    mockLeaf1.parentElement.closest = jest.fn().mockReturnValue(mockBranch);
    mockLeaf2.parentElement.closest = jest.fn().mockReturnValue(mockBranch);

    // Create tree
    mockTree = {
      children: [mockBranch],
      setAttribute: jest.fn(),
      value: ''
    } as unknown as HTMLGuxTreeBetaElement;

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

  describe('#setSelectedNode', () => {
    it('should set node as selected and update tree value', () => {
      setSelectedNode(mockTree, mockLeaf1);

      expect(mockLeaf1.selected).toBe(true);
      expect(mockLeaf2.selected).toBe(false);
      expect(mockTree.value).toBe('leaf1');
      expect(mockLeaf1.scrollIntoView).toHaveBeenCalledWith({
        block: 'nearest'
      });
    });

    it('should not set selection when element has no value', () => {
      mockLeaf1.value = '';

      setSelectedNode(mockTree, mockLeaf1);

      expect(mockLeaf1.selected).toBe(false);
      expect(mockTree.value).toBe('');
    });
  });

  describe('#setSelectedNodeByValue', () => {
    it('should find and select node by value', () => {
      setSelectedNodeByValue(mockTree, 'leaf2');

      expect(mockLeaf2.selected).toBe(true);
      expect(mockLeaf1.selected).toBe(false);
      expect(mockTree.value).toBe('leaf2');
    });

    it('should expand parent nodes when selecting', () => {
      const mockParentBranch = {
        expanded: false,
        parentElement: {
          closest: jest.fn().mockReturnValue(null)
        }
      };
      mockLeaf2.parentElement.closest = jest
        .fn()
        .mockReturnValue(mockParentBranch);

      setSelectedNodeByValue(mockTree, 'leaf2');

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
  });

  describe('#setFirstNodeActive', () => {
    it('should handle setting first node active without errors', () => {
      expect(() => {
        setFirstNodeActive(mockTree);
      }).not.toThrow();
    });
  });

  describe('#setLastNodeActive', () => {
    it('should set last available node as active', () => {
      setLastNodeActive(mockTree);

      expect(mockLeaf2.active).toBe(true);
      expect(mockLeaf1.active).toBe(false);
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
  });

  describe('#setPreviousNodeActive', () => {
    it('should set previous node as active', () => {
      mockLeaf2.active = true;

      setPreviousNodeActive(mockTree);

      expect(mockLeaf2.active).toBe(false);
      expect(mockLeaf1.active).toBe(true);
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
});
