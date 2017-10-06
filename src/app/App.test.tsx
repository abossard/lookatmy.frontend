import React from 'react';
import {App, AppState} from './App';
import renderer from 'react-test-renderer';

test('Does render', ()=>{
    const component = renderer.create(
        <App appState={new AppState()}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});