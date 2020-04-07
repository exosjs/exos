import type webpack from "webpack";

export default (isDevelopment: boolean): webpack.ExternalsElement => {
  if (isDevelopment) {
    return {};
  }

  return {
    react: "React",
    "react-dom": "ReactDOM",
  };
};
