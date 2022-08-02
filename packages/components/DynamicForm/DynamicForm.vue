<template>
    <div
        :style='!!formConfig._style.style && formConfig._style.style'>
        <el-form
            :inline="true"
            :rules="currentRules"
            :model="formData"
            :label-position="formConfig._style.labelPosition"
            :size="formConfig._style.size"
            label-width="30%"
            ref="dynamicForm"
            style="height: 100%">
            <el-container>
                <el-main style="height: 80%;text-align: left">
                    <el-col
                        :span="24/formConfig._style.columns * (condition.columns === undefined?1:condition.columns)   "
                        v-for="(condition, index) in formConfig._items"
                        :key="index">
                        <DynamicItem
                            v-model="formData"
                            :conditions="formConfig"
                            :condition="condition"
                            :itemWidth="formConfig._style.width||'width:70%'"
                            :getOptionFun="getOptionFun"
                            :uploadParameter="uploadParameter"
                            :uploadPath="uploadPath"
                            :uploadHeaders="uploadHeaders"
                            v-if="'customize'!==condition.type"
                            :attrs="$attrs">
                        </DynamicItem>
                        <el-form-item
                            :label="condition.text"
                            :prop=condition.key
                            v-if="'customize'===condition.type"
                            :style="formConfig._style.width||'width:70%'">
                            <slot
                                :name="condition.slotName"
                                v-bind:condition="condition">
                            </slot>
                        </el-form-item>
                    </el-col>
                    <el-col
                        v-if="formConfig._style&&!formConfig._style.standardLayout"
                        :span="formConfig._items? 24 - 24 / formConfig._style.columns * (formConfig._items.length % formConfig._style.columns):24">
                        <el-row type="flex" justify="end">
                            <el-button @click="handleCancel">{{ buttonName.cancel }}</el-button>
                            <el-button type="primary" @click="submitForm">
                                {{ buttonName.submit }}
                            </el-button>
                        </el-row>
                    </el-col>
                </el-main>
                <el-footer v-if="formConfig._style&&formConfig._style.standardLayout">
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="1">
                            <el-button @click="handleCancel">{{ buttonName.cancel }}</el-button>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" @click="submitForm" :loading="submitButtonLoading">
                                {{ buttonName.submit }}
                            </el-button>
                        </el-col>
                    </el-row>
                </el-footer>
            </el-container>
        </el-form>
    </div>
</template>

<script>
import DynamicItem from './DynamicItem'

export default {
    name: 'ElementForm2',
    data() {
        return {
            submitButtonLoading: false
        }
    },
    props: {
        formConfig: {
            type: Object
        },
        formData: {
            type: Object
        },
        handleSubmitButton: {
            type: Function
        },
        handleCancelButton: {
            type: Function
        },
        getOptionFun: {
            type: Function
        },
        getRulesFun: {
            type: Function
        },
        uploadParameter: {
            type: Object
        },
        uploadPath: {
            type: String
        },
        uploadHeaders: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: {
        DynamicItem
    },
    computed: {
        buttonName: function() {
            switch (this.formConfig._style.isInsertOrUpdate) {
                case 0:
                    return { submit: this.formConfig._style.submitButtonName || '提交', cancel: '重置' }
                case 1:
                    return { submit: '增加', cancel: '取消' }
                case 2:
                    return { submit: '更新', cancel: '取消' }
                default:
                    return { submit: '提交', cancel: '重置' }
            }
        },
        currentRules: function() {
            const rules = this.formConfig._rules
            if (this.formConfig._rulesName === undefined) {
                return rules
            }
            Object.keys(this.formConfig._rulesName).forEach((object) => {
                this.formConfig._rulesName[object].forEach(ruleName => {
                    const ruleFile = this.getRulesFun(ruleName)
                    if (this.formConfig._rules[object] === undefined) {
                        this.formConfig._rules[object] = []
                    }
                    ruleFile.forEach(rule => {
                        this.formConfig._rules[object].push(rule)
                    })
                }
                )
            })
            return rules
        }
    },
    methods: {
        submitForm() {
            this.submitButtonLoading = true
            this.$refs.dynamicForm.validate(async(valid) => {
                if (valid) {
                    const json = {}
                    const formData = this.formData
                    this.formConfig._items.forEach(function(item) {
                        if (formData[item.key] === undefined) {
                            json[item.key] = ''
                        } else if (formData[item.key] instanceof Array && formData[item.key].length === 0) {
                            json[item.key] = ''
                        } else {
                            json[item.key] = formData[item.key]
                        }
                    })
                    this.handleSubmitButton(json)
                } else {
                    return false
                }
            })
            this.submitButtonLoading = false
        },
        uploadSubmit() {
            this.$refs.dynamicForm.fields.forEach(field => {
                if (field.$children instanceof Array && field.$children.length === 2) {
                    if (field.$children[1].submit instanceof Function) {
                        console.log(field);
                        field.$children[1].submit()
                    }
                }
            })
        },
        handleCancel() {
            if (this.handleCancelButton !== undefined && this.handleCancelButton instanceof Function) {
                this.handleCancelButton()
            } else {
                this.resetForm()
            }
        },
        resetForm() {
            this.$refs.dynamicForm.fields.forEach(field => {
                if (field.$children instanceof Array && field.$children.length === 2) {
                    if (field.$children[1].clearFiles instanceof Function) {
                        field.$children[1].clearFiles()
                    }
                }
                field.resetField()
            })
        }
    }
}
</script>