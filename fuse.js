// ./fuse.js
const { FuseBox, WebIndexPlugin } = require("fuse-box");

const fuse =  FuseBox.init({
  homeDir : "./src",
  output : "./build/$name.js",
  useTypescriptCompiler : true,
  plugins: [
  ]
});

//fuse.dev(); // launch http server


fuse.bundle("server")
    .target("server@es2017")
    .watch("server/**")
    .instructions("> [server/server.ts]")
    .completed((proc) => {		
      proc.require({
        close: ({ FuseBox }) => FuseBox.import(FuseBox.mainFile).shutdown()
      });
    })

fuse
   .bundle("htdocs/index.bundle")
   .target("browser@es6")
   .instructions(" > app/index.tsx")
   .hmr()
   .watch("app/**");
fuse.run();