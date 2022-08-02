export const dynamicFormDemoConfig = {
    _style: {
        columns: 3,
        isInsertOrUpdate: 0,
        submitButtonName: '增加',
        standardLayout: false,
        labelPosition: 'right',
        style: ''
    },
    _items: [{
        key: 'desc',
        text: '活动形式',
        type: 'textarea',
        rows: 10,
        change: 'testChange'
    }, 
    {
        key: 'password',
        text: '用户密码',
        type: 'password'
    }, 
    {
        key: 'advice',
        text: '输入建议',
        type: 'input',
        restaurants: [
            { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
            { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
            { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
            { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
            { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        ],
        extendProps: { 'prefix-icon': "el-icon-search" }
    },
    {
        key: 'customizeDemo',
        text: '验证码',
        type: 'customize',
        slotName: 'VerificatioCode'
    },
    {
        key: 'city',
        text: '城市级联',
        type: 'cascader',
        tranCode: 'queryCity',
        props: { multiple: true }
    },
    {
        key: 'region',
        text: '活动区域',
        type: 'multiple',
        tranCode: 'queryExchange'
    },
    {
        key: 'datetime',
        text: '时间范围',
        type: 'date-range'
    },
    {
        key: 'datetime',
        text: '时间日期',
        type: 'date'
    },
    {
        key: 'customizeDemo2',
        text: '人员规模',
        type: 'customize',
        slotName: 'StaffSize'
    },
    {
        key: 'conditon1',
        text: '查询条件1',
        type: 'select',
        options: [{
            value: 'test1',
            label: '员工11号',
            department: 'A部门',
            exchange: '00',
            branchNo: '0001',
            conditon3: 'xx1'
        }, {
            value: 'test2',
            label: '员工12号',
            department: 'A部门',
            exchange: '00',
            branchNo: '0002',
            conditon3: 'xx1'
        }, {
            value: 'test3',
            label: '员工21号',
            department: 'B部门',
            exchange: '01',
            ceshi0: 'xxxxxxx',
            branchNo: '0003',
            conditon3: 'xx2'
        }, {
            value: 'test4',
            label: '员工22号',
            department: 'B部门',
            exchange: '01',
            ceshi0: 'xxxxxxx',
            branchNo: '0004',
            conditon3: 'xx2'
        }],
        options_item: [{
            name: 'label'
        }, {
            name: 'realName'
        }, {
            name: 'department'
        }]
    },
    {
        key: 'conditon2',
        text: '查询条件2',
        type: 'radio',
        options: [{
            text: '测试1',
            value: 'xx1'
        }, {
            text: '测试2',
            value: 'xx2'
        }, {
            text: '测试3',
            value: 'xx3'
        }]
    },
    {
        key: 'conditon3',
        text: '查询条件3',
        type: 'checkbox',
        options: [{
            label: '测试1',
            value: 'xx1'
        }, {
            label: '测试2',
            value: 'xx2'
        }]
    },
    {
        key: 'uploadFile',
        text: '选择文件',
        type: 'upload',
        columns: 1,
        handleUploadSuccess: 'uploadSuccess',
        accept: '.jpg,.txt,.pptx'
    }
    ],
    _rules: {},
    _rulesName: {
        password: ['passwordRule']
    }
}

