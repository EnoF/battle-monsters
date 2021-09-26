module.exports = (api) => {
  api.cache(false);
  return {
    presets: ["next/babel"],
    plugins: [
      [
        "@babel/proposal-pipeline-operator",
        {
          proposal: "hack",
          topicToken: "#",
        },
      ],
    ],
  };
};
