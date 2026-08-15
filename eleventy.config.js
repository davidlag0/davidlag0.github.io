export default function(eleventyConfig) {
  eleventyConfig.addBundle("css");
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["liquid", "html"],
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  };
}
