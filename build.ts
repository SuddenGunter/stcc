import tailwindPlugin from "./tailwind-plugin";

await Bun.build({
	entrypoints: ["./index.html"],
	outdir: "./dist",
	minify: true,
	plugins: [tailwindPlugin],
});

console.log("🚀 Build complete with working Tailwind CSS!");
