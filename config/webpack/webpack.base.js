import p from "bundle-declarations-webpack-plugin";
import path from "path";

const __dirname = path.resolve();

export default {
	entry: path.resolve(__dirname, "src/"),
	module: {
		rules: [
			{
				exclude: "/\\node_modules\\[^\\]+$/gusm",
				test: /\.(ts|mts)$/,
				use: { loader: "swc-loader" }
			}
		]
	},

	name: "base",
	output: {
		clean: true,
		filename: "[name].cjs",
		path: path.resolve(__dirname, "dist")
	},
	resolve: {
		extensions: ["", ".ts", ".js", ".mjs", ".mts"],
		alias: {
			"@": path.resolve(__dirname, "src/")
		}
	},
	target: "node",
	plugins: [
		new p.BundleDeclarationsWebpackPlugin({
			entry: ["./src/utils/types.ts"],
			outFile: "types.d.ts",
			compilationOptions: {
				libraries: {
					inlinedLibraries: ["zod"]
				}
			}
		})
	]
};
