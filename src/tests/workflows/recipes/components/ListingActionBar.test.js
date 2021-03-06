import { List } from 'immutable';
import TestComponent from 'console/workflows/recipes/components/ListingActionBar';

const { WrappedComponent: ListingActionBar } = TestComponent;

describe('<ListingActionBar>', () => {
  const props = {
    columns: new List(),
    getCurrentUrlAsObject: () => {},
    history: {},
    push: () => {},
    saveRecipeListingColumns: () => {},
  };

  it('should work', () => {
    const wrapper = () => shallow(<ListingActionBar {...props} />);

    expect(wrapper).not.toThrow();
  });
});
