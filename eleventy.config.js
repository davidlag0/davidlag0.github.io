export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  };
}
