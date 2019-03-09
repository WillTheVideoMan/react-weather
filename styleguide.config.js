module.exports = {
  sections: [
    {
      name: "Introduction",
      content: "docs/intro.md"
    },
    {
      name: "Installation",
      content: "docs/install.md"
    },
    {
      name: "Components",
      description:
        "Each component comes together to form the weather animations. Animating and drawing functions have been split into two components, where the animator is the parent of the drawer.",
      components: "src/components/*.js",
      usageMode: "expand"
    }
  ]
};
