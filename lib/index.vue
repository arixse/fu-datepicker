<template>
    <div class="fu-datepicker-input" ref="pickerInput" @click.stop="openDatePicker($event)">
        <input type="text"  readonly :value="widgetValue | time" :placeholder="placeholder" />
        <i class="iconfont i-f_a_d"></i>
    </div>
</template>
<script>
import Vue from "vue"
import Datepicker from "./picker"
export default {
    data() {
        return {
            widgetValue: ""
        }
    },
    props: {
        value: {
            // eslint-disable-next-line vue/require-prop-type-constructor
            type: Number | String
        },
        placeholder: {
            type: String
        },
        type:{
            type:String
        }
    },
    methods: {
        openDatePicker(e) {
            let pickerInstance
            let target = e.target.parentNode;
            let pickerInput = this.$refs.pickerInput
            let pickerPosition = target.getBoundingClientRect()
            let vm
            if (!this.pickerBox) {
                let picker = document.createElement("div")
                document.body.appendChild(picker)
                let con = Datepicker.default || Datepicker
                this.vm = vm = new Vue({
                    render: h =>
                        h(con, {
                            props: {
                                value: this.widgetValue,
                                type: this.type
                            }
                        })
                }).$mount(picker)
                this.pickerBox = vm.$el
                this.pickerBox.style.display = "none"
            }
            pickerInstance = this.pickerBox
            pickerInstance.style.position = "absolute"
            pickerInstance.style.left = pickerPosition.left + "px"
            pickerInstance.style.zIndex = 999;
            let pickerHeight = pickerInstance.offsetHeight;
            let pickerInputHeight = pickerInput.offsetHeight;
            if (
                pickerPosition.top <
                target.offsetHeight + pickerHeight
            ) {
                pickerInstance.style.top =
                    pickerPosition.top + pickerInputHeight + "px"
            } else {
                pickerInstance.style.top =
                    pickerPosition.top - pickerHeight + "px"
            }
            this.pickerBox.style.display = "block"
            this.vm.$children[0].$on("input", val => {
                this.widgetValue = val
                this.$emit("input", val)
            })
        },
        closePicker() {
            if (this.pickerBox) {
                this.pickerBox.style.display = "none"
            }
        }
    },
    mounted() {
        document.addEventListener("click", () => {
            this.closePicker()
        })
    },
    beforeDestroy() {
        document.removeEventListener("click", () => {})
        if (this.pickerBox) {
            document.body.removeChild(this.pickerBox)
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(val) {
                this.widgetValue = val
            }
        }
    }
}
</script>
<style lang="stylus">
picker-width = 260px;
:root {
    --input-border-color-normal:#a5b0b6;
    --input-border-color-focus:#38aef3
}
.fu-datepicker-input {
    width: picker-width;
    border: 1px solid var(--input-border-color-normal);
    border-radius: 2px;
    box-sizing: border-box;
    padding: 0 10px;
    line-height: initial;

    input {
        width: 87%;
        height: 30px;
        border: 0;
        border: 0;
        outline: none;
    }

    &:hover {
        border: 1px solid var(--input-border-color-focus);
    }
}
</style>