// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
		input: [
      "./src/server.ts",
      "./src/electron.ts",
      "./src/electron.preload.ts"
    ],
		output: [
			{
				dir: "out/js",
				format: "cjs",
			}
		],
		plugins: [
      commonjs(),
      typescript(),
    ],
    external: [
      "fs",
      "cracksdb",
      "express",
      "socket.io",
      "http",
      "https",
      "cors",
      "body-parser",
      "path",
      "sharp",
      "url",
      "electron",
      "electron-is-dev",
      "serve-handler",
      "node:process"
    ]
	},
];  
