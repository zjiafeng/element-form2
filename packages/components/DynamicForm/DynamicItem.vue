<template>
  <el-form-item
    :label="condition.text"
    :prop="condition.key"
    :style="itemWidth"
  >
    <!--输入框-->
    <el-autocomplete
      clearable
      v-if="'input' === condition.type"
      v-model="formData[condition.key]"
      :placeholder="condition.placeholder || condition.text"
      @change="change"
      style="width: 100%"
      :fetch-suggestions="querySearch"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    />
    <!--输入框-->
    <el-input
      clearable
      show-word-limit
      v-if="'textarea' === condition.type"
      :rows="condition.rows || 3"
      type="textarea"
      v-model="formData[condition.key]"
      :placeholder="condition.placeholder || condition.text"
      @change="change"
      style="width: 100%"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    />
    <!--密码框-->
    <el-input
      type="password"
      clearable
      show-password
      v-if="'password' === condition.type"
      v-model="formData[condition.key]"
      :placeholder="condition.placeholder || condition.text"
      @change="change"
      style="width: 100%"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    />
    <!--下拉单选框-->
    <el-select
      clearable
      filterable
      remote
      default-first-option
      v-if="'select' === condition.type"
      v-model="formData[condition.key]"
      :placeholder="condition.placeholder || condition.text"
      style="width: 100%"
      @change="change"
      @focus="remoteMethod"
      :remote-method="remoteMethod"
      :loading="loading"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    >
      <div class="right">
        <el-tooltip
          v-for="option in selectOptions"
          class="option"
          effect="light"
          :disabled="!option.tooltip"
          :content="option.tooltip"
          placement="right-start"
          :key="option.value"
        >
          <el-option :label="option.label" :value="option.value">
            <el-col
              :span="item.width || 24 / condition.options_item.length"
              v-for="(item, index) in condition.options_item"
              :key="index"
            >
              {{ option[item.name] }}
            </el-col>
          </el-option>
        </el-tooltip>
      </div>
    </el-select>
    <!--下拉多选框-->
    <el-select
      clearable
      multiple
      filterable
      remote
      collapse-tags
      default-first-option
      v-if="'multiple' === condition.type"
      v-model="formData[condition.key]"
      style="width: 100%"
      :placeholder="condition.placeholder || condition.text"
      @change="change"
      @focus="remoteMethod"
      :loading="loading"
      :remote-method="remoteMethod"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    >
      <el-button
        type="primary"
        style="margin-left: 5%"
        size="mini"
        @click="selectOption(1)"
        >全选</el-button
      >
      <el-button type="success" size="mini" @click="selectOption(-1)"
        >反选</el-button
      >
      <el-button type="info" size="mini" @click="selectOption(0)"
        >取消</el-button
      >
      <el-tooltip
        v-for="option in selectOptions"
        class="option"
        effect="light"
        :disabled="!option.tooltip"
        :content="option.tooltip"
        placement="right-start"
        :key="option.value"
      >
        <el-option :label="option.label" :value="option.value">
          <el-col
            :span="item.width || 24 / condition.options_item.length"
            v-for="(item, index) in condition.options_item"
            :key="index"
          >
            {{ option[item.name] }}
          </el-col>
        </el-option>
      </el-tooltip>
    </el-select>
    <!--radio单选框-->
    <div v-if="'radio' === condition.type">
      <el-radio
        v-for="option in options"
        :key="option.value"
        v-model="formData[condition.key]"
        :style="`width:` + (100 / options.length - 10) + `%`"
        :label="option.value"
        @change="change"
        :disabled="condition.disabled && isInsertOrUpdate !== 1"
        v-bind="condition.extendProps"
      >
        {{ option.text }}
      </el-radio>
    </div>
    <!--checkbox多选框-->
    <el-checkbox-group
      v-if="'checkbox' === condition.type"
      v-model="formData[condition.key]"
      @change="change"
      v-bind="condition.extendProps"
    >
      <el-checkbox
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.value"
        :disabled="condition.disabled && isInsertOrUpdate !== 1"
      >
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
    <el-cascader
      clearable
      collapse-tags
      filterable
      v-if="'cascader' === condition.type"
      v-model="formData[condition.key]"
      :options="options"
      :props="condition.props"
      :show-all-levels="condition.showAllLevels"
      style="width: 100%"
      :placeholder="condition.placeholder || condition.text"
      @change="change"
      :filter-method="cascaderFilterHandle"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    />
    <el-date-picker
      v-if="'date-range' === condition.type"
      v-model="formData[condition.key]"
      type="daterange"
      range-separator="至"
      :start-placeholder="condition.startPlaceholder || '开始日期'"
      :end-placeholder="condition.endPlaceholder || '结束日期'"
      value-format="yyyyMMdd"
      :picker-options="rangePickerOptions"
      style="width: 100%"
      @change="change"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    />
    <el-date-picker
      v-if="'month-range' === condition.type"
      v-model="formData[condition.key]"
      type="monthrange"
      range-separator="至"
      :start-placeholder="condition.startPlaceholder || '开始月份'"
      :end-placeholder="condition.endPlaceholder || '结束月份'"
      value-format="yyyyMM"
      style="width: 100%"
      @change="change"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    />
    <el-date-picker
      v-if="'date' === condition.type"
      v-model="formData[condition.key]"
      type="date"
      :placeholder="condition.placeholder || condition.text"
      value-format="yyyyMMdd"
      :picker-options="pickerOptions"
      style="width: 100%"
      @change="change"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    />
    <el-date-picker
      v-if="'month' === condition.type"
      v-model="formData[condition.key]"
      type="month"
      :placeholder="condition.placeholder || condition.text"
      value-format="yyyyMM"
      style="width: 100%"
      @change="change"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    />
    <el-date-picker
      v-if="'week' === condition.type"
      v-model="formData[condition.key]"
      type="week"
      :placeholder="condition.placeholder || condition.text"
      format="yyyy 第 WW 周"
      value-format="yyyyMMdd"
      style="width: 100%"
      @change="change"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    />
    <el-date-picker
      v-if="'year' === condition.type"
      v-model="formData[condition.key]"
      type="year"
      :placeholder="condition.placeholder || condition.text"
      value-format="yyyy"
      style="width: 100%"
      @change="change"
      :disabled="condition.disabled && isInsertOrUpdate !== 1"
      v-bind="condition.extendProps"
    />
    <el-upload
      v-if="'upload' === condition.type"
      ref="upload"
      :headers="uploadHeaders"
      :action="condition.action === undefined ? uploadPath : condition.action"
      multiple
      drag
      :limit="condition.limit"
      :accept="condition.accept"
      :data="uploadParameter"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :auto-upload="false"
      :file-list="formData[condition.key]"
      v-bind="condition.extendProps"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </el-form-item>
</template>

<script>
import {
  datePickerOptionsShortcuts,
  dateRangePickerOptionsShortcuts,
} from "../../config/controlConfig";
import pinyin from "pinyin-match";

export default {
  name: "DynamicItem",
  data() {
    return {
      rangePickerOptions: dateRangePickerOptionsShortcuts,
      pickerOptions: datePickerOptionsShortcuts,
      optionsInit: [],
      selectOptions: [],
      restaurants: this.condition.restaurants || [],
      fileList: [],
      isSelectAll: "",
      loading: false,
    };
  },
  props: {
    value: {
      type: Object,
    },
    condition: {
      type: Object,
    },
    conditions: {
      type: Object,
    },
    getOptionFun: {
      type: Function,
    },
    itemWidth: {
      type: String,
    },
    uploadParameter: {
      type: Object,
    },
    uploadPath: {
      type: String,
    },
    uploadHeaders: {
      type: Object,
      default() {
        return {};
      },
    },
    attrs: {
      type: Object,
    },
  },
  computed: {
    formData: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    options: function () {
      let options = this.optionsInit;
      return options;
    },
    isInsertOrUpdate: function () {
      return this.conditions._style.isInsertOrUpdate || 0;
    },
  },
  created() {
    if (
      this.condition.type === "checkbox" ||
      this.condition.type === "multiple"
    ) {
      if (this.formData[this.condition.key]) {
        if (typeof this.formData[this.condition.key] === "string") {
          this.$set(
            this.formData,
            this.condition.key,
            this.formData[this.condition.key].split(",")
          );
        }
      }
      if (!this.formData[this.condition.key]) {
        this.$set(this.formData, this.condition.key, []);
      }
    }
  },
  async mounted() {
    this.optionsInit =
      this.condition.options === undefined ? [] : this.condition.options;
    if (
      this.condition.tranCode !== undefined &&
      this.condition.tranCode.length > 0
    ) {
      const tranCode = this.condition.tranCode;
      this.optionsInit = await this.getOptionFun(tranCode);
    }
    this.selectOptions = this.optionsInit;
  },
  methods: {
    change(value, oldValue) {
      this.attrs[this.condition.change] &&
        this.attrs[this.condition.change](value, oldValue);
    },
    handleUploadSuccess(response, file, fileList) {
      this.attrs[this.condition.handleUploadSuccess] &&
        this.attrs[this.condition.handleUploadSuccess](
          response,
          file,
          fileList
        );
    },
    handleUploadError(err, file, fileList) {
      this.attrs[this.condition.handleUploadError] &&
        this.attrs[this.condition.handleUploadError](err, file, fileList);
    },
    selectOption(value) {
      if (value === 1) {
        this.formData[this.condition.key] = [];
        this.optionsInit.forEach((item) => {
          this.formData[this.condition.key].push(item.value);
        });
      } else if (value === -1) {
        const tempMultipleValues = [...this.formData[this.condition.key]];
        this.formData[this.condition.key] = [];
        this.optionsInit.forEach((item) => {
          if (tempMultipleValues.indexOf(item.value) === -1) {
            this.formData[this.condition.key].push(item.value);
          }
        });
      } else if (value === 0) {
        this.formData[this.condition.key] = [];
      } else {
        this.formData[this.condition.key] = [];
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.condition.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleChange(files, fileList) {
      this.formData[this.condition.key] = fileList;
    },
    handleRemove(file) {
      const _tmp = this.formData[this.condition.key];
      for (let i = 0, len = _tmp.length; i < len; i++) {
        if (_tmp[i].name === file.name) {
          _tmp.splice(i, 1);
          break;
        }
      }
      this.formData[this.condition.key] = _tmp;
    },
    cascaderFilterHandle(node, value) {
      if (
        node.label.toString().toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        node.value.toString().toLowerCase().indexOf(value.toLowerCase()) > -1
      ) {
        return true;
      }
    },
    async remoteMethod(query) {
      this.loading = true;
      let options = this.optionsInit;

      if (
        this.condition.tranCode !== undefined &&
        this.condition.tranCode.length > 0
      ) {
        options = await this.getOptionFun(this.condition.tranCode);
      }
      if (query instanceof Object || query === "") {
        if (this.condition.type === "select") {
          this.$set(this.formData, this.condition.key, "");
        }
        this.selectOptions = options;
      } else {
        this.selectOptions = options.filter((item) => {
          if (query.split(",").includes(item.value)) {
            if (
              !this.formData[this.condition.key] ||
              this.formData[this.condition.key].indexOf(item.value) === -1
            ) {
              if (this.formData[this.condition.key] instanceof Array) {
                this.formData[this.condition.key].push(item.value);
              } else {
                this.$set(this.formData, this.condition.key, item.value);
              }
            }
          }
          const isPinyinMatch =
            pinyin.match(item.label, query) || pinyin.match(item.value, query);
          return (
            isPinyinMatch ||
            query.toLowerCase().split(",").indexOf(item.value.toLowerCase()) >
              -1
          );
        });
      }
      this.loading = false;
    },
    querySearch(queryString, cb) {
      const restaurants = this.restaurants;
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
  },
};
</script>

<style>
.el-form-item__content {
  width: 70%;
}
</style>
