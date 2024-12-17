<template>
  <div class="content">
    <el-form
      :rules="rules"
      status-icon
      ref="ruleFormRef"
      :model="form"
      v-bind="setAttrs(formOption)"
    >
      <el-form-item
        v-for="(item, index) in formItem?.filter((info) => !info.isHidden)"
        :key="index"
        v-bind="setAttrs(item)"
        :prop="item.key"
      >
        <el-input
          v-if="item.itemType === 'input' || item.itemType === 'ipInput'"
          :type="item.type || 'text'"
          :prefix-icon="item.prefixIcon ? item.icon : ''"
          :suffix-icon="item.suffixIcon ? item.icon : ''"
          :autocomplete="item.autocomplete"
          :placeholder="item.placeholder ? item.placeholder : `请输入${item.label}`"
          :disabled="item.disabled"
          :show-password="item.showPassword"
          v-model="form[item.key]"
          :style="{ width: item.contentWidth || '180px' }"
        />
        <el-date-picker
          v-if="item.itemType === 'datePicker'"
          v-model="form[item.key]"
          :disabled="item.disabled"
          type="datetime"
          :placeholder="`请选择${item.label}`"
          format="YYYY/MM/DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          :style="{ width: item.contentWidth || '180px' }"
        />
        <el-date-picker
          v-if="item.itemType === 'dateTimeRange'"
          v-model="form[item.key]"
          v-bind="setAttrs(item)"
          :style="{ width: item.contentWidth || '400px' }"
          type="datetimerange"
          format="YYYY/MM/DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          :default-time="defaultTime"
          range-separator="到"
          start-placeholder="请选择开始时间"
          end-placeholder="请选择结束时间"
        />
        <el-date-picker
          v-if="item.itemType === 'date'"
          v-model="form[item.key]"
          v-bind="setAttrs(item)"
          type="date"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          :style="{ width: item.contentWidth || '180px' }"
        />
        <el-time-picker
          v-if="item.itemType === 'timePicker'"
          v-model="form[item.key]"
          v-bind="setAttrs(item)"
          value-format="HH:mm:ss"
          :placeholder="`请选择${item.label}`"
          :style="{ width: item.contentWidth || '180px' }"
        />
        <el-input-number
          v-else-if="item.itemType === 'numberInput'"
          :type="item.type || 'text'"
          :autocomplete="item.autocomplete"
          :min="item.min || 1"
          :placeholder="`请输入${item.label}`"
          :disabled="item.disabled"
          v-model="form[item.key]"
          :style="{ width: item.contentWidth || '180px' }"
          @change="item.change"
        />
        <el-select
          v-else-if="item.itemType === 'select'"
          :placeholder="`请选择${item.label}`"
          :multiple="item.multiple"
          :collapse-tags="item.collapseTags"
          :collapse-tags-tooltip="item.collapseTagsTooltip"
          :disabled="item.disabled"
          :clearable="!item.required"
          v-model="form[item.key]"
          :style="{ width: item.contentWidth || '180px' }"
          @change="item.change"
        >
          <template v-if="item.options && item.options.length > 0">
            <el-option
              v-for="(option, index) in item.options"
              :key="index"
              v-bind="setAttrs(option)"
            />
          </template>
          <template v-else>
            <el-option
              v-for="(option, index) in optionObject[item.key]"
              :key="index"
              v-bind="setAttrs(option)"
            />
          </template>
        </el-select>
        <el-checkbox v-if="item.itemType === 'checkbox'" v-model="form[item.key]"></el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, defineEmits, defineProps, defineExpose } from 'vue'
import type { FormInstance } from 'element-plus'
import type { FormItem, FormRules } from '@/types/formInfo'
import type { FormItemRule } from '@/types/formInfo'

const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]
/*ip地址正则校验*/
const checkIpAddr = (rule: FormItemRule<any>, value: any, callback: any) => {
  let str =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  if (value && !str.test(value)) {
    callback(new Error('请输入正确的ip地址'))
  } else {
    callback()
  }
}
const emit = defineEmits(['confirm', 'cancel'])

const props = defineProps({
  formItem: Array as () => FormItem[],
  formOption: Object
})

const rules = reactive<FormRules>({})

const form = reactive<any>({})
const formObj = reactive<any>({})
const optionObject = reactive<any>({})
//需要添加数据格式绑定的插件类型

const watchItemValChange = (propsItemIndex: number) => {
  watch(
    () => props.formItem?.[propsItemIndex],
    (newValue) => {
      form[props.formItem?.[propsItemIndex].key] = newValue.value
    },
    {
      deep: true
    }
  )
}

props.formItem?.forEach(async (item, propsItemIndex) => {
  if (item.required) {
    const trigger = item.itemType !== 'input' ? 'change' : 'blur'
    rules[item.key] = [
      {
        required: true,
        message: item.label
          ? `请${item.itemType !== 'input' && item.itemType !== 'ipInput' ? '选择' : '输入'}${item.label}`
          : item.placeholder,
        trigger: trigger
      }
    ]
  }
  if (item.itemType === 'select' && item.value && item.change) {
    //初始化 init时不清空选中值，只有联动下拉变更才清空下级值
    item.change(item.value, 'init')
  }
  /*ip地址规则校验*/
  if (item.itemType === 'ipInput') {
    const _rule = [
      {
        message: '请输入正确的IP地址',
        validator: checkIpAddr,
        trigger: 'blur'
      }
    ]
    if (rules[item.key] && (rules[item.key] as Array<any>).length > 0) {
      ;(rules[item.key] as Array<any>).push(..._rule)
    } else {
      rules[item.key] = _rule as Array<any>
    }
  }
  /*个性化自定义校验*/
  if (item.rule && item.rule.length > 0) {
    if (rules[item.key] && (rules[item.key] as Array<any>).length > 0) {
      ;(rules[item.key] as Array<any>).push(...item.rule)
    } else {
      rules[item.key] = item.rule as Array<any>
    }
  }
  /*编辑回填校验*/
  if (item.value || item.value === 0) {
    form[item.key] = item.value
  }

  if ((!item.options || item.options.length < 1) && typeof item.getOptions === 'function') {
    optionObject[item.key] = await item.getOptions()
  }

  watchItemValChange(propsItemIndex)
})

const ruleFormRef = ref<FormInstance>()

const saveFn = async () => {
  if (!ruleFormRef.value) return
  const flag = await ruleFormRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      emit('confirm', form)
    } else {
      console.log('error submit!', fields)
    }
  })
  if (flag) {
    return form
  }
  return null
}

const getForm = () => {
  return form
}

const cancel = () => {
  emit('cancel')
}

//默认列配置项
const defaultOptions = reactive({
  type: 'text'
})
/**给元素设置属性*/
const setAttrs = (params: any) => {
  const options = { ...params, ...defaultOptions }
  return { ...options }
}
// 重置表单
const reset = () => {
  props.formItem.forEach((item) => {
    if (item.key) {
      form[item.key] = ''
    }
  })
}
defineExpose({
  saveFn,
  getForm,
  reset
})
</script>

<style lang="scss" scoped>
:deep(.el-input, .el-input__wrapper, .el-input__inner) {
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
:deep(.el-form-item__label) {
  color: var(--font-color-gray-3);
}
</style>
