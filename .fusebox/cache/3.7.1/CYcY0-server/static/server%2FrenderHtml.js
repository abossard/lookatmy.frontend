module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction renderHtml(body, css, title, initialState) {\n    return `\r\n    <!DOCTYPE html>\r\n    <html>\r\n      <head>\r\n        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>\r\n        <title>${title}</title>\r\n        <style id=\"styles-target\">\r\n            ${css}\r\n        </style>\r\n      </head>\r\n\r\n      <body>\r\n        <div id=\"root\">${body}</div>\r\n      </body>\r\n\r\n      <script src=\"/static/index.bundle.js\"></script>\r\n    </html>\r\n  `;\n}\nexports.renderHtml = renderHtml;\n",
dependencies: [],
sourceMap: {},
headerContent: undefined,
mtime: 1582437322689,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
