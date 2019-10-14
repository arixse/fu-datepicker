<template>
    <div class="fu-datepicker-container" @click.stop>
        <div class="fu-datepicker" v-if="type=='datetime'" ref="picker">
            <div class="fu-datepicker-year-months">
                <span class="slide-prev">
                    <i class="slide-prev-next iconfont i-l1" @click.stop="prevYear"></i>
                    <i class="slide-prev-next iconfont i-l" @click.stop="prevMonth"></i>
                </span>
                <span class="year-month-text" :title="year+'年'+month+'月'">{{year}}年{{month}}月</span>
                <span class="slide-next">
                    <i class="slide-prev-next iconfont i-r" @click.stop="nextMonth"></i>
                    <i class="slide-prev-next iconfont i-r1" @click.stop="nextYear"></i>
                </span>
            </div>
            <div class="fu-datepicker-date" v-show="pickDate">
                <table>
                    <thead>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                        <th>日</th>
                    </thead>
                    <tbody>
                        <tr v-for="(week,index) in days" :key="index">
                            <td v-for="(day,index) in week" :key="index">
                                <span
                                    :class="{'gray':!day.enable,'actived':isActived(day),'today':isToday(day)}"
                                    class="fu-date-item"
                                    @click.stop="selectDate(day)"
                                >{{isToday(day)?'今':day.showDate}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="fu-datepicker-time" v-show="!pickDate">
                <div class="fu-time-item" v-for="hour in hours" :key="hour" @click.stop="changeHour(hour)" :class="{'actived':isHourActived(hour)}">{{hour}}</div>
                <div class="fu-time-item" v-for="min in minAndSecs" :key="min" @click.stop="changeMin(min)" :class="{'actived':isMinActived(min)}">{{min}}</div>
                <div class="fu-time-item" v-for="sec in minAndSecs" :key="sec" @click.stop="changeSec(sec)" :class="{'actived':isSecActived(sec)}">{{sec}}</div>
            </div>
            <div class="fu-datepicker-pick-change" @click.stop="changePick">{{pickDate?'选择时间':'选择日期'}}</div>
        </div>
        <div class="fu-datepicker" v-if="type=='month'" @click.stop="showPicker=true" ref="picker">
            <div class="fu-datepicker-year-months">
                <i class="slide-prev-next iconfont i-l1" @click.stop="prevYear"></i>
                <span class="year-month-text month-text" :title="year+'年'">{{year}}年</span>
                <i class="slide-prev-next iconfont i-r1" @click.stop="nextYear"></i>
            </div>
            <table>
                <tr v-for="(row,index) in months" :key="index">
                    <td v-for="m in row" :key="m">
                        <span
                            class="fu-month-item"
                            @click.stop="selectMonth(m)"
                            :class="{'current':isCurrentMonth(m),'actived':isActivedMonth(m)}"
                        >{{isCurrentMonth(m)?'当月':m}}</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import datePickerHelper from "./date-helper"
export default {
    data() {
        return {
            showPicker: true,
            isTop: false,
            dateInfos: datePickerHelper.getYearMonthDates(),
            pickDate: true,
            hours: datePickerHelper.getHours(),
            minAndSecs: datePickerHelper.getMinOrSec(),
            months: datePickerHelper.getMonths(4)
        }
    },
    props: {
        value: {
            type: Number | String,
            default: ""
        },
        type: { type: String, default: "datetime" }, //时间类型：datetime|date

        placeholder: { type: String, default: "" }
    },
    watch: {
        value: {
            handler(newVal) {
                let date = newVal instanceof Date ? newVal : new Date(newVal)
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                // let hour = date.getHours();
                // let min = date.getMinutes();
                // let sec = date.getSeconds();
                this.dateInfos = datePickerHelper.getYearMonthDates(year, month)
            }
        }
    },
    methods: {
        openDatePicker(e) {
            let target = e.target
            let picker = this.$refs.picker
            let pickerPosition = target.getBoundingClientRect()
            if (pickerPosition.top < target.offsetHeight + $(picker).height()) {
                this.isTop = false
            } else {
                this.isTop = true
            }
            this.showPicker = !this.showPicker
        },
        selectDate(day) {
            if (day.showDate) {
                let value = new Date(
                    day.year,
                    day.month - 1,
                    day.showDate
                ).getTime()
                this.$emit("input", value)
                this.showPicker = false
            }
        },
        selectMonth(m) {
            let value = new Date(this.year, m - 1).getTime()
            this.$emit("input", value)
            this.showPicker = false
        },
        isActived(day) {
            if (this.value && day.showDate) {
                let date = new Date(this.value)
                return (
                    date.getFullYear() == day.year &&
                    date.getMonth() == day.month - 1 &&
                    date.getDate() == day.showDate
                )
            }
            return false
        },
        isToday(day) {
            if (day.showDate) {
                let date = new Date()
                return (
                    date.getFullYear() == day.year &&
                    date.getMonth() == day.month - 1 &&
                    date.getDate() == day.showDate
                )
            }
            return false
        },
        isCurrentMonth(m) {
            let date = new Date()
            return m - 1 == date.getMonth() && this.year == date.getFullYear()
        },
        isActivedMonth(m) {
            let value =
                this.value instanceof Date ? this.value : new Date(this.value)
            return m - 1 == value.getMonth() && this.year == value.getFullYear()
        },
        prevYear() {
            this.dateInfos = datePickerHelper.getYearMonthDates(
                this.year - 1,
                this.month
            )
        },
        prevMonth() {
            let year = this.year
            let month = this.month
            if (month == 1) {
                month = 12
                year--
            } else {
                month--
            }
            this.dateInfos = datePickerHelper.getYearMonthDates(year, month)
        },
        nextMonth() {
            let year = this.year
            let month = this.month
            if (month == 12) {
                month = 1
                year++
            } else {
                month++
            }
            this.dateInfos = datePickerHelper.getYearMonthDates(year, month)
        },
        nextYear() {
            this.dateInfos = datePickerHelper.getYearMonthDates(
                this.year + 1,
                this.month
            )
        },
        changePick() {
            this.pickDate = !this.pickDate
        },
        changeHour(hour) {
            let value = new Date(this.value).setHours(parseInt(hour))
            this.$emit("input", value)
            // this.showPicker = false;
            // this.pickDate = true;
        },
        changeMin(min) {
            let value = new Date(this.value).setMinutes(parseInt(min))
            this.$emit("input", value)
            // this.showPicker = false;
            // this.pickDate = true;
        },
        changeSec(sec) {
            let value = new Date(this.value).setSeconds(parseInt(sec))
            this.$emit("input", value)
            // this.showPicker = false;
            // this.pickDate = true;
        },
        isHourActived(hour) {
            return new Date(this.value).getHours() == hour
        },
        isMinActived(min) {
            return new Date(this.value).getMinutes() == min
        },
        isSecActived(sec) {
            return new Date(this.value).getSeconds() == sec
        }
    },
    computed: {
        year() {
            return this.dateInfos.year
        },
        month() {
            return this.dateInfos.month
        },
        days() {
            let days = this.dateInfos.days
            let result = []
            for (let i = 0; i < 6; i++) {
                result.push(days.slice(i * 7, i * 7 + 7))
            }
            return result
        }
    },
    mounted() {
        document.body.addEventListener("click", () => {
            this.showPicker = false
        })
    },
    beforeDestroy() {
        document.body.removeEventListener("click")
    }
}
</script>

<style lang="stylus">
picker-width = 260px;

:root {
    --main-bg-color:#fff;
    --prod-color-gray:#a5b0b6;
    --bg-fill-normal:#fff;
    --common-shadow:0 2px 6px #ccc;
    --prod-normal-color:#38aef3;
    --hover-bg-color:rgba(#38aef3,10%);
    --function-disabled-color:rgba(#a5b0b6,10%);
    --font-white-color:#fff;
    --actived-bg-color:rgba(#a5b0b6,10%);
    --function-link-color:#54d3be;
}

.fu-datepicker-container {
    background: var(--main-bg-color);

    .slide-prev {
        float: left;
    }

    .slide-next {
        float: right;
    }

    .slide-prev-next {
        color: var(--prod-color-gray);
    }
}

.fu-datepicker {
    width: picker-width;
    height: auto;
    background: var(--bg-fill-normal);
    top: 100%;
    left: 0;
    right: 0;
    border-radius: 2px;
    box-shadow: var(--common-shadow);
    z-index: 999;

    table {
        width: 100%;
        padding: 15px 0;
        text-align: center;

        td {
            padding: 5px 0;

            .fu-month-item {
                width: 34px;
                height: 20px;
                line-height: 20px;
                cursor: pointer;
                display: inline-block;
                border-radius: 2px;
            }

            .fu-month-item.current {
                background: var(--main-bg-color);
                color: var(--prod-normal-color);
                border: 1px solid var(--prod-normal-color);
            }

            .fu-month-item.actived {
                background: var(--prod-normal-color);
                color: var(--font-white-color);
            }

            .fu-month-item:not(.actived):not(.disabled):hover {
                background: var(--hover-bg-color);
            }
        }
    }

    &.top {
        top: 0;
        left: 0;
        right: 0;
        transform: translateY(-100%);
    }
}

.fu-datepicker-year-months {
    height: 34px;
    line-height: 34px;
    border-bottom: 1px solid var(--function-disabled-color);
    padding: 0 15px;

    i {
        cursor: pointer;
        user-select: none;
    }

    .year-month-text {
        display: inline-block;
        width: 146px;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;

        &.month-text {
            width: 187px;
        }
    }
}

.fu-datepicker-date {
    height: 260px;
    clear: both;
    padding: 0 15px;
    border-bottom: 1px solid var(--function-disabled-color);

    table {
        width: 100%;
        padding: 0;

        th {
            color: #c0c4cc;
            font-weight: normal;
            font-size: 14px;
            line-height: 22px;
        }

        td {
            text-align: center;
            padding: 8px 0;
            font-size: 14px;
            cursor: pointer;
            line-height: initial;

            .fu-date-item {
                display: inline-block;
                width: 20px;
                height: 20px;
                border-radius: 2px;
            }

            .fu-date-item.gray {
                color: var(--prod-color-gray);
            }

            .fu-date-item.today {
                background: var(--main-bg-color);
                color: var(--prod-normal-color);
                border: 1px solid var(--prod-normal-color);
            }

            .fu-date-item.actived {
                background: var(--prod-normal-color);
                color: var(--font-white-color);
            }

            .fu-date-item:not(.actived):not(.disabled):hover {
                background: var(--hover-bg-color);
            }
        }
    }
}

.fu-datepicker-time {
    clear: both;
    height: 260px;
    border-bottom: 1px solid var(--function-disabled-color);
}

.fu-datepicker-pick-change {
    clear: both;
    height: 34px;
    line-height: 34px;
    text-align: center;
    color: var(--prod-normal-color);
    cursor: pointer;
}

.fu-time-scroll {
    width: 33%;
    float: left;
}

.fu-time-item {
    height: 26px;
    text-align: center;
    line-height: 26px;
    cursor: pointer;
    border-right: 1px solid var(--function-disabled-color);

    &:hover {
        background: var(--hover-bg-color);
    }
}

.fu-time-item.actived {
    background: var(--actived-bg-color);
    color: var(--function-link-color);
    font-weight: bold;
}
</style>