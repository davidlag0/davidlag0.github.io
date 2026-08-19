import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { readFileSync } from "fs";
import { resolve } from "path";

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  eleventyConfig.addTransform("inlineCss", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      const cssPath = resolve("src/css/style.css");
      const css = readFileSync(cssPath, "utf-8");
      const tag = `<link rel="stylesheet" href="/css/style.css">`;
      const inline = `<style>${css}</style>`;
      return content.replace(tag, inline);
    }
    return content;
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp"],
    widths: [150, 300, 450],
    sharpWebpOptions: {
      quality: 50,
      effort: 6,
    },
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
    },
  });

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/_posts/**/*.md")
      .filter(post => !post.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("dateFormat", function(date) {
    return date.toISOString().split("T")[0];
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["liquid", "html", "md"],
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  };
}
