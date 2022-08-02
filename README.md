<p align="center">
    element-form2
</p>
<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.14-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.15.7-brightgreen.svg" alt="element-ui">
  </a>
</p>

## 简介

使用 [vue2](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element) 实现
可通过配置json文件生成form表单

## 功能

```
1.根据配置文件动态生成表单控件。（支持控件：单选、多选、时间、radio、输入框、密码框、级联、文件上传以及自定义控件）
2.通过配置控制表单单行显示控件个数。
3.通过配置控制单选、多选等控件下拉数据获取方式。
4.通过配置控制表单元素验证规则。
5.对于系统内部统一的验证规则可以内置，全局统一验证规则。
```
## 接口
### 表单参数

| 参数               | 说明                                                         | 类型                       | 可选值 | 默认值 |
| ------------------ | ------------------------------------------------------------ | -------------------------- | ------ | ------ |
| formConfig         | 表单参数                                                     | Object                     |        |        |
| formData           | 表单数据，通过formData[item唯一标识]赋值、获取表单数据       | Object                     |        | {}     |
| handleSubmitButton | 表单提交函数，通过formData[item唯一标识]或者通过入参json获取表单数据 | Function(json: string)     |        |        |
| handleCancelButton | 表单取消函数，不传默认重置表单；可用户隐藏弹窗               | Function()                 |        |        |
| getOptionFun       | 获取表单item的Option函数                                     | Function(tranCode: string) |        |        |
| getRulesFun        | 获取表单item的Rules函数                                      | Function(ruleName: string) |        |        |
| uploadParameter    | 上传时附带的额外参数                                         | object                     |        |        |
| uploadPath         | 必选参数，上传的地址                                         | string                     |        |        |
| uploadHeaders      | 设置上传的请求头部                                           | object                     |        |        |

##### 表单formConfig参数

|    参数    | 说明                                                         | 类型         | 可选值        | 默认值                                                 |
| :--------: | ------------------------------------------------------------ | ------------ | ------------- | ------------------------------------------------------ |
|   _style   | 表单样式                                                     | Object       | {"columns":1} | {"columns":1,"submitButtonName":"提交","width":"auto"} |
|   _items   | 表单项数组,表述表单所有item项                                | Array\<item> |               |                                                        |
|   _rules   | 表单验证规则，与element的Form中rules相同                     | Object       | null          |                                                        |
| _rulesName | 表单验证规则函数名字，{"item唯一标识":"规则函数名称"，"item唯一标识":"规则函数名称"} | Object       | null          |                                                        |

##### _style参数

| 参数             | 说明                                                         | 类型    | 可选值                   | 默认值 |
| ---------------- | ------------------------------------------------------------ | ------- | ------------------------ | ------ |
| columns          | 表单显示列数                                                 | Number  | 1/2/3                    | 1      |
| isInsertOrUpdate | 控制下方按钮显示，默认显示提交 重置，为0时可通过_style.submitButtonName自定义名称 | Number  | 0/1/2 1增加 2更新        |        |
| submitButtonName | 表单确认钮名称                                               | String  | 提交                     | 提交   |
| width            | 表单里的item宽度                                             | String  | 225                      | auto   |
| standardLayout   | 表单底部按钮 水平分布/紧凑                                   | Boolean | true/水平分布 false/紧凑 | false  |
| style            | 表单样式                                                     | String  |                          |        |
| labelPosition    | 表单域标签的位置                                             | String  | right/left/top           | right  |
| size             | 用于控制该表单内组件的尺寸                                   | String  | medium / small / mini    |        |

##### _item参数

| 参数        | 说明                                  | 类型           | 可选值                                                       | 默认值 |
| ----------- | ------------------------------------- | -------------- | ------------------------------------------------------------ | ------ |
| key         | item的唯一标识                        | String         | ---                                                          |        |
| text        | item的label名称                       | String         | ---                                                          |        |
| type        | item的类型                            | String         | input/textarea/password/select/multiple/radio/checkbox/cascader/datetime/upload<br>customize(自定义组件) |        |
| columns     | 表单显示占用列数                      | Number         | 1/2/3                                                        | 1      |
| tranCode    | item所需Option的获取功能号            | String         | ---                                                          |        |
| options     | item所需Option数据                    | Array\<opiton> | ---                                                          |        |
| placeholder | 输入框占位文本                        | string         |                                                              |        |
| disabled    | 是否禁用                              | Number/Boolean | 1/0 true/false                                               | false  |
| slotName    | 自定义组件名称，type为customize时有效 | string         |                                                              |        |
| extendProps | 同elementui的Attributes               | Object         | {'prefix-icon': "el-icon-search"}                            |        |



