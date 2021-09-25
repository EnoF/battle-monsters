module.exports = (api) => {
  api.cache(false);
  return {
    presets: ["@babel/preset-env", "next/babel"],
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
