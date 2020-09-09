import React from 'react';
import { shallow } from 'enzyme';

import { IconType } from '../icon/Icon';
import { SearchInput } from './SearchInput';

describe('<SearchInput />', () => {
    it('renders icon and input', () => {
        const wrapper = shallow(<SearchInput value="1" onChange={() => {}} />);

        expect(wrapper.find('Icon')).toHaveProp({
            type: IconType.MIRROR,
            className: 'icon',
        });
        expect(wrapper.find('input')).toHaveProp({
            type: 'text',
            value: '1',
            placeholder: 'Search',
            'data-cy': 'search-input',
            className: 'input',
        });
    });

    it('calls onChange prop when input change', () => {
        const onChangeMock = jest.fn();
        const wrapper = shallow(<SearchInput value="1" onChange={onChangeMock} />);

        wrapper.find('input').simulate('change', {
            target: {
                value: 'new val',
            },
        });

        expect(onChangeMock).toHaveBeenCalledWith('new val');
    });
});
