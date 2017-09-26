import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {style} from 'typestyle';

const redText = style({color: 'red'});

ReactDOM.render(
    <div className={redText}>hello</div>,
    document.getElementById('root') as HTMLElement
);
