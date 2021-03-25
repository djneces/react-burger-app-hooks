import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;
  //is executed before each test
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    // const wrapper = shallow(<NavigationItems />);
    //2 navigation items if we are not authenticated
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it('should render three <NavigationItem /> elements if authenticated', () => {
    // const wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true }); //we need to pass props
    //3 navigation items if we are authenticated
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it('should render an exact logout button if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)
    ).toEqual(true);
  });
});
