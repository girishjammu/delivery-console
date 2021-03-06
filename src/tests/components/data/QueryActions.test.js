import TestComponent from 'console/components/data/QueryActions';
import { StubComponent } from 'console/tests/utils';

const { WrappedComponent: QueryActions } = TestComponent;

describe('<QueryActions>', () => {
  const props = {
    fetchAllActions: () => {},
  };

  it('should work', () => {
    const wrapper = () => shallow(<QueryActions {...props} />);

    expect(wrapper).not.toThrow();
  });

  it('should call fetchAllActions on mount', () => {
    let called = false;
    shallow(
      <QueryActions
        fetchAllActions={() => {
          called = true;
        }}
      />,
    );

    expect(called).toBe(true);
  });

  it('should call fetchAllActions once if container props change', () => {
    let callCount = 0;
    const wrapper = mount(
      <StubComponent fakeProp={1}>
        <QueryActions
          fetchAllActions={() => {
            callCount += 1;
          }}
        />
      </StubComponent>,
    );

    wrapper.setProps({ fakeProp: 2 });
    wrapper.setProps({ fakeProp: 3 });
    wrapper.setProps({ fakeProp: 4 });

    expect(callCount).toBe(1);
  });

  it('should not render anything', () => {
    const wrapper = shallow(<QueryActions {...props} />);
    expect(wrapper.children().length).toBe(0);
  });
});
