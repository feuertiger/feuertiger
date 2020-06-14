import { test, describe, expect } from '@jest/globals';
import { SideBar } from './sideBar';
import { ThemeProvider } from '../../providers/themeProvider';
import { shallow } from 'enzyme';

describe('Test side bar', () => {
    test('should create side bar', () => {
        const component = shallow(
            <SideBar open={false} handleDrawerClose={() => {}} />,
            {
                wrappingComponent: ThemeProvider
            }
        );
        expect(component).toMatchSnapshot();
    });
    test('should be open', () => {
        const component = shallow(
            <SideBar open={true} handleDrawerClose={() => {}} />,
            {
                wrappingComponent: ThemeProvider
            }
        );
        expect(component).toMatchSnapshot();
    });
    test('should be closed', () => {
        const component = shallow(
            <SideBar open={false} handleDrawerClose={() => {}} />,
            {
                wrappingComponent: ThemeProvider
            }
        );
        expect(component).toMatchSnapshot();
    });
    test('should trigger handleDrawerClose', () => {
        let triggerdClose = false;
        const component = shallow(
            <SideBar
                open={true}
                handleDrawerClose={() => {
                    triggerdClose = true;
                }}
            />,
            {
                wrappingComponent: ThemeProvider
            }
        );
        const closeButton = component.find('#sidebar-close-button');
        expect(closeButton).toBeTruthy();
        closeButton.simulate('click');
        expect(triggerdClose).toBeTruthy();
    });
});
