import {Context} from "koa";
import * as React from "react";
import {renderToString} from "react-dom/server";
import {getStyles} from "typestyle";
import {App} from "../app/App";
import {createStore} from "../app/State";
import {renderHtml} from "./renderHtml";

const handleRender = async (ctx: Context) => {
    const store = createStore();
    const appHtml = renderToString(<App {...store} />);
    const styles =  getStyles();
    ctx.body = renderHtml(appHtml, styles, process.env.HTML_TITLE as string, JSON.stringify(store));
};

export {handleRender};
