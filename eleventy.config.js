import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public": "/" });
  eleventyConfig.addPassthroughCopy({ "src/css": "/css" });
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp"],
    widths: [150, 300, 450],
    sharpWebpOptions: {
      quality: 60,
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
