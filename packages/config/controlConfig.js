export const dateRangePickerOptionsShortcuts = {
    shortcuts: [{
        text: '今天',
        onClick(picker) {
            const date = new Date()
            picker.$emit('pick', [date, date])
        }
    }, {
        text: '本周至今',
        onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setDate(start.getDate() - new Date().getDay() + 1)
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '本月至今',
        onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().setDate(1))
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '本年至今',
        onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '最近一周',
        onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setDate(start.getDate() - 7)
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 1)
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '最近六个月',
        onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 6)
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '最近一年',
        onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 12)
            picker.$emit('pick', [start, end])
        }
    }]
}
export const datePickerOptionsShortcuts = {
    shortcuts: [{
        text: '今天',
        onClick(picker) {
            const date = new Date()
            picker.$emit('pick', date)
        }
    }, {
        text: '昨天',
        onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
        }
    }, {
        text: '一周前',
        onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
        }
    }, {
        text: '一个月前',
        onClick(picker) {
            const date = new Date()
            date.setMonth(date.getMonth() - 1)
            picker.$emit('pick', date)
        }
    }, {
        text: '一个年前',
        onClick(picker) {
            const date = new Date()
            date.setMonth(date.getMonth() - 12)
            picker.$emit('pick', date)
        }
    }]
}
