<template>
  <div id="app">
    <ElementForm2
      style="height: 100%; text-align: center"
      :formConfig="formConfig"
      :formData="formData"
      :handleSubmitButton="submit"
      :getOptionFun="getOptionFun"
      :getRulesFun="getRulesFun"
      :uploadParameter="uploadParameter"
      :uploadPath="uploadPath"
      :uploadHeaders="uploadHeaders"
      :uploadSuccess="uploadSuccess"
      :testChange="testChange"
      ref="dynamicForm"
    >
      <template
        v-for="(formConfigItem, index) in formConfig._items.filter((item) => {
          return item.slotName || false;
        })"
        v-slot:[formConfigItem.slotName]="{ condition }"
      >
        <component
          :key="index"
          :is="formConfigItem.slotName"
          :condition="condition"
          :formData="formData"
          :conditions="formConfig"
        ></component>
      </template>
    </ElementForm2>
    <el-steps direction="vertical" v-if="jsonArray.length > 0">
      <el-step v-for="(item, idx) in jsonArray" :key="idx">
        <template slot="title">
          {{ item }}
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
import { rules } from "./config/itemRules";
import { dynamicFormDemoConfig } from "./config/DynamicFormDemoConfig";
import VerificatioCode from "./VerificatioCode";
import StaffSize from "./StaffSize";

export default {
  name: "App",
  data() {
    return {
      formData: { conditon3: "xx1,xx2", region: "选项1,选项2" },
      // 测试数据
      formConfig: dynamicFormDemoConfig,
      uploadParameter: {},
      uploadPath: "https://jsonplaceholder.typicode.com/posts/",
      uploadHeaders: { "x-token": "12345" },
      jsonArray: [],
    };
  },
  components: {
    VerificatioCode,
    StaffSize,
  },
  mounted() {},
  methods: {
    submit(json) {
      console.log(json);
      this.jsonArray.push(json);
      // const params = {
      //     version: '12312',
      //     versionDesc: '22222',
      //     path: '/test/' + this.formData.uploadFile[0].name
      // }
      // this.uploadParameter = {
      //     savePath: 'test',
      //     serviceType: 'demo',
      //     params: JSON.stringify(params)
      // }
      // this.$nextTick(() => {
      //     this.$refs.dynamicForm.uploadSubmit()
      // })
    },
    getOptionFun(tranCode) {
      if (tranCode === "queryExchange") {
        return [
          {
            value: "选项1",
            label: "beijing",
          },
          {
            value: "选项2",
            label: "shanghai",
          },
        ];
      } else if (tranCode === "queryCity") {
        return [
          {
            value: 1,
            label: "东南",
            children: [
              {
                value: 2,
                label: "上海",
                children: [
                  { value: 3, label: "普陀" },
                  { value: 4, label: "黄埔" },
                  { value: 5, label: "徐汇" },
                ],
              },
              {
                value: 7,
                label: "江苏",
                children: [
                  { value: 8, label: "南京" },
                  { value: 9, label: "苏州" },
                  { value: 10, label: "无锡" },
                ],
              },
              {
                value: 12,
                label: "浙江",
                children: [
                  { value: 13, label: "杭州" },
                  { value: 14, label: "宁波" },
                  { value: 15, label: "嘉兴" },
                ],
              },
            ],
          },
          {
            value: 17,
            label: "西北",
            children: [
              {
                value: 18,
                label: "陕西",
                children: [
                  { value: 19, label: "西安" },
                  { value: 20, label: "延安" },
                ],
              },
              {
                value: 21,
                label: "新疆维吾尔族自治区",
                children: [
                  { value: 22, label: "乌鲁木齐" },
                  { value: 23, label: "克拉玛依" },
                ],
              },
            ],
          },
        ];
      }
    },
    getRulesFun(ruleName) {
      return rules[ruleName];
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },
    testChange(value, oldValue) {
      console.log(value, oldValue);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
:deep(.el-upload),
:deep(.el-upload-dragger) {
  width: 100%;
}
</style>
