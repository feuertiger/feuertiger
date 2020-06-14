import 'jest-enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { setConfig } from 'next/config';
import config from './next.config';

setConfig(config);
Enzyme.configure({ adapter: new Adapter() });
