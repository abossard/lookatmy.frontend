export function renderHtml(body: string, css: string, title: string, initialState: string): string {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <title>${title}</title>
        <style id="styles-target">
            ${css}
        </style>
      </head>

      <body>
        <div id="root">${body}</div>
      </body>

      <script src="/static/index.bundle.js"></script>
    </html>
  `;
}
