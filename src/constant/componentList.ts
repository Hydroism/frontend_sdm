const modulesFiles: any = require.context('@/views', true, /\.vue$/)
let COMPONENT_LIST: any[] = [];

/**
 * 这是views视图的所有页面
 * 主要用于菜单管理MenuEditDialog.vue中组件的选项常量
 */
modulesFiles.keys().forEach((key: string) => {
  if (key.indexOf('components') === -1) {
    let componentPath = key.replace(/^\.\/(.*)\.\w+$/, '$1');
    COMPONENT_LIST.push(componentPath);
  }
});

export default COMPONENT_LIST;
