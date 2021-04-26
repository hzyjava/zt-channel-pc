/*
 * @Autor: zhanglp
 * @Description:
 * @Date: 2021-04-26 14:20:14
 * @LastEditTime: 2021-04-26 15:03:11
 */
module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: "css" }
    ]
  ]
};
