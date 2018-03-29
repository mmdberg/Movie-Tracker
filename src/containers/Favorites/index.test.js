import { shallow } from 'enzyme';
import { Card } from './index';

describe('Favorite', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Favorites />);
    expect(wrapper).toMatchSnapshot()
  })

})