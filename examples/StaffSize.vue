<template>
  <div class="staff-size">
    <el-input placeholder="人" v-model.number="count1" clearable> </el-input>
    <span class="line"></span>
    <el-input placeholder="人" v-model.number="count2" clearable> </el-input>
  </div>
</template>

<script>
export default {
  name: "StaffSize",
  props: {
    formData: {
      type: Object,
    },
    condition: {
      type: Object,
    },
  },
  data() {
    return {
      count1: "",
      count2: "",
    };
  },
  computed: {
    count: function(){
        return [this.count1, this.count2];
    }
  },
  watch: {
    count(){
        this.$set(this.formData, this.condition.key, this.count);
    }
  }
};
</script>

<style scoped>
.staff-size {
  display: flex;
  align-items: center;
}
.line {
  display: inline-block;
  background-color: #bfbfbf;
  width: 30px;
  height: 1px;
  margin: 0 4px;
}
</style>