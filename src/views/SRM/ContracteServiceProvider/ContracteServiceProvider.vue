<template>
  <div class="content">
    <div class="content-header">
      <a-form :layout="formLayout" class="table-search-form" :form="form">
        <a-row :gutter="24">
          <!-- v-for="i in 10" :key="i" -->
          <a-col :span="3">
            <a-form-item :label="`签约服务商代码`">
              <a-input
                v-decorator="[
                  `servercode`,
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Input something!'
                      }
                    ]
                  }
                ]"
                placeholder="请填写英文/字母/数字非中文组合"
              />
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <a-form-item :label="`签约服务商名称`">
              <a-input
                v-decorator="[
                  'servername',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true
                      }
                    ]
                  }
                ]"
                placeholder="请填写英文/字母/中文组合"
              />
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <a-form-item :label="`签约服务商类型`">
              <a-select
                label-in-value
                v-decorator="[
                  'servertype',
                  {
                    rules: [
                      { required: true, message: 'Please select your gender!' }
                    ],
                    initialValue: { key: '' }
                  }
                ]"
                placeholder="Select a option and change input text above"
                @change="handleSelectChange"
              >
                <a-select-option value="">
                  全部
                </a-select-option>
                <a-select-option value="male">
                  代理操作服务商
                </a-select-option>
                <a-select-option value="female">
                  全程代理服务商
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="3">
            <a-form-item :label="`签约主体`">
              <a-select
                label-in-value
                v-decorator="[
                  'contactsubject',
                  {
                    rules: [
                      { required: true, message: 'Please select your gender!' }
                    ],
                    initialValue: { key: 'male' }
                  }
                ]"
                placeholder="Select a option and change input text above"
                @change="handleSelectChange"
              >
                <a-select-option value="">
                  全部
                </a-select-option>
                <a-select-option value="male">
                  香港億格有限公司
                </a-select-option>
                <a-select-option value="female">
                  深圳市前海云途物流有限公司
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="2">
            <a-form-item :label="`状态`">
              <a-select
                label-in-value
                v-decorator="[
                  'contactsubject',
                  {
                    rules: [
                      { required: true, message: 'Please select your gender!' }
                    ],
                    initialValue: { key: '' }
                  }
                ]"
                placeholder="Select a option and change input text above"
                @change="handleSelectChange"
              >
                <a-select-option value="">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  启用
                </a-select-option>
                <a-select-option value="2">
                  未启用
                </a-select-option>
                <a-select-option value="3">
                  禁用
                </a-select-option>
                <a-select-option value="4">
                  已提交
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-form-item :label="`审核状态`">
              <a-select
                label-in-value
                v-decorator="[
                  'auditStatus',
                  {
                    rules: [
                      { required: true, message: 'Please select your gender!' }
                    ],
                    initialValue: { key: '' }
                  }
                ]"
                placeholder="Select a option and change input text above"
                @change="handleSelectChange"
              >
                <a-select-option value="">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  待审核
                </a-select-option>
                <a-select-option value="2">
                  审核失败
                </a-select-option>
                <a-select-option value="3">
                  审核成功
                </a-select-option>
                <a-select-option value="4">
                  审核中
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="3">
            <a-form-item :label="`内部联系人`">
              <a-select
                label-in-value
                v-decorator="[
                  'internalContact',
                  {
                    rules: [
                      { required: true, message: 'Please select your gender!' }
                    ],
                    initialValue: { key: '' }
                  }
                ]"
                placeholder="Select a option and change input text above"
                @change="handleSelectChange"
              >
                <a-select-option value="">
                  全部
                </a-select-option>
                <a-select-option value="1">
                  admin
                </a-select-option>
                <a-select-option value="2">
                  丽萍
                </a-select-option>
                <a-select-option value="3">
                  翠莲
                </a-select-option>
                <a-select-option value="4">
                  志勇
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col style="display: flex;" :span="3">
            <a-form-item class="hide-lbl" label="">
              <a-button
                type="primary"
                icon="search"
                style="margin-bottom: auto;margin-top:28px;margin-right:16px;"
                @click="handleSearch"
              >
                查询
              </a-button>
            </a-form-item>
            <a-form-item class="hide-lbl" label="">
              <a-button
                @click="handleReset"
                icon="redo"
                style="margin-bottom: auto;margin-top:28px;"
              >
                重置
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'form_search' }),
      formLayout: 'vertical'
    }
  },
  computed: {},
  methods: {
    handleSearch(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
      })
    },

    handleReset() {
      this.form.resetFields()
    },
    handleSelectChange(value) {
      console.log(value)
      // this.form.setFieldsValue({
      //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      // })
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  &-header {
    padding: 16px;
    // opacity: 0.2;
    background: #fbfbfb;
    .table-search-form {
      .ant-form-item {
        padding-bottom: 0px !important;
      }
      .ant-form-item {
        // margin-bottom: 16px;
      }
      // .hide-lbl .ant-form-item-label {
      //   visibility: hidden;
      // }
    }
  }
}
</style>
