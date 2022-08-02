import DynamicForm from './DynamicForm/DynamicForm'

// 为组件提供 install 安装方法，供按需引入
DynamicForm.install = function(Vue) {
    Vue.component(DynamicForm.name, DynamicForm)
}
// 默认导出组件
export default DynamicForm
