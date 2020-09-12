import React from 'react';
import { shallow, mount } from 'enzyme';

import { Separator } from './Separator';

describe('<Separator />', () => {
    it('renders draggable div', () => {
        const wrapper = shallow(<Separator onWidthChange={() => {}} />);

        expect(wrapper).toHaveProp({
            className: 'separator',
            'data-cy': 'content-separator',
            draggable: true,
        });
    });

    it('calls onWidthChange when drag started and dragover is fired on window', () => {
        const onWidthChange = jest.fn();
        const wrapper = mount(<Separator onWidthChange={onWidthChange} />);

        wrapper.simulate('dragStart');
        window.dispatchEvent(new MouseEvent('dragover', { clientX: 123 }));

        expect(onWidthChange).toHaveBeenCalledWith(123);
    });

    it('does not call onWidthChange when drag started and ended', () => {
        const onWidthChange = jest.fn();
        const wrapper = mount(<Separator onWidthChange={onWidthChange} />);

        wrapper.simulate('dragStart');
        wrapper.simulate('dragEnd');
        window.dispatchEvent(new MouseEvent('dragover', { clientX: 123 }));

        expect(onWidthChange).not.toHaveBeenCalled();
    });
});
