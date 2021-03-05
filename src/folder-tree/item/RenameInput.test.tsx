import React from 'react';
import { shallow } from 'enzyme';

import { RenameInput } from './RenameInput';

describe('<RenameInput />', () => {
    it('renders form and input', () => {
        const wrapper = shallow(<RenameInput name="name" onConfirm={() => {}} />);

        expect(wrapper.find('form')).toHaveLength(1);
        expect(wrapper.find('form > input')).toHaveProp({
            'data-cy': 'rename-folder-input',
            type: 'text',
            required: true,
            autoFocus: true,
            value: 'name',
        });
    });

    it('calls onConfirm with new name value on input blur', () => {
        const onConfirmMock = jest.fn();
        const wrapper = shallow(<RenameInput name="name" onConfirm={onConfirmMock} />);
        wrapper.find('input').simulate('change', { target: { value: 'new name' } });

        wrapper.find('input').simulate('blur');

        expect(onConfirmMock).toHaveBeenCalledWith('new name');
    });

    it('calls onConfirm with new name value on form submit', () => {
        const onConfirmMock = jest.fn();
        const wrapper = shallow(<RenameInput name="name" onConfirm={onConfirmMock} />);
        wrapper.find('input').simulate('change', { target: { value: 'new name' } });

        wrapper.find('form').simulate('submit');

        expect(onConfirmMock).toHaveBeenCalledWith('new name');
    });
});
