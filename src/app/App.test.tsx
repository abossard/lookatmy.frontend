import React from 'react';
import {TimerView, AppState} from './App';
import renderer from 'react-test-renderer';

test('Does render', ()=>{
    const component = renderer.create(
        <TimerView appState={new AppState()}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});