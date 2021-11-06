import React from 'react';
import {shallow} from 'enzyme';
import Login from "../Views/Login";


describe('Login Component', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<Login/>).find('form').exists()).toBe(true)
    })
})

it('renders a username input', () => {
    expect(shallow(<Login/>).find('#username').length).toEqual(1)
})
it('renders a password input', () => {
    expect(shallow(<Login/>).find('password').length).toEqual(1)
})

describe('Username input', () => {
    it('should respond to change event and change the state of the Singin Component', () =>
    {
        const wrapper = shallow(<Login/>);
        wrapper.find('#username').simulate('change', {target: {name: 'username', value:
                    'gayan'}});
        expect(wrapper.state('username')).toEqual('gayan');
    })
})
describe('Password input', () => {
    it('should respond to change event and change the state of the Sing Component', () =>
    {
        const wrapper = shallow(<Login/>);
        wrapper.find('#password').simulate('change', {target: {name: 'password', value:
                    '1234'}});
        expect(wrapper.state('password')).toEqual('1234');
    })
})