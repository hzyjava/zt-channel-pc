<template>
  <a-form :layout="formLayout" :form="form" @submit="handleSubmit">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group
        default-value="horizontal"
        @change="handleFormLayoutChange"
      >
        <a-radio-button value="horizontal">
          Horizontal
        </a-radio-button>
        <a-radio-button value="vertical">
          Vertical
        </a-radio-button>
        <a-radio-button value="inline">
          Inline
        </a-radio-button>
      </a-radio-group>
    </a-form-item>

    <a-form-item v-bind="formItemLayout" label="E-mail">
      <a-input
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          }
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                validator: validateToNextPassword
              }
            ]
          }
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Confirm Password" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!'
              },
              {
                validator: compareToFirstPassword
              }
            ]
          }
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        Nickname&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input
        v-decorator="[
          'nickname',
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
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Habitual Residence">
      <a-cascader
        v-decorator="[
          'residence',
          {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [
              {
                type: 'array',
                required: true,
                message: 'Please select your habitual residence!'
              }
            ]
          }
        ]"
        :options="residences"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Phone Number">
      <a-input
        v-decorator="[
          'phone',
          {
            rules: [
              { required: true, message: 'Please input your phone number!' }
            ]
          }
        ]"
        style="width: 100%"
      >
        <a-select
          slot="addonBefore"
          v-decorator="['prefix', { initialValue: '86' }]"
          style="width: 70px"
        >
          <a-select-option value="86">
            +86
          </a-select-option>
          <a-select-option value="87">
            +87
          </a-select-option>
        </a-select>
      </a-input>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Website">
      <!-- <a-auto-complete
        v-decorator="[
          'website',
          { rules: [{ required: true, message: 'Please input website!' }] }
        ]"
        placeholder="website"
        @change="handleWebsiteChange"
      >
        <template slot="dataSource">
          <a-select-option v-for="website in autoCompleteResult" :key="website">
            {{ website }}
          </a-select-option>
        </template>
        <a-input />
      </a-auto-complete> -->
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="Captcha"
      extra="We must make sure that your are a human."
    >
      <a-row :gutter="8">
        <a-col :span="12">
          <a-input
            v-decorator="[
              'captcha',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input the captcha you got!'
                  }
                ]
              }
            ]"
          />
        </a-col>
        <a-col :span="12">
          <a-button>Get captcha</a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
        I have read the
        <a href="">
          agreement
        </a>
      </a-checkbox>
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <a-button type="primary" html-type="submit">
        Register
      </a-button>
    </a-form-item>

    <a-form-item style="max-width: 300px;">
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [{ required: true, message: 'Please input your username!' }]
          }
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item style="max-width: 300px;">
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Please input your Password!' }]
          }
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item style="max-width: 300px;">
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true
          }
        ]"
      >
        Remember me
      </a-checkbox>
      <a class="login-form-forgot" style="float: right;" href="">
        Forgot password
      </a>
      <a-button
        style="width: 100%;"
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        Log in
      </a-button>
      Or
      <a href="">
        register now!
      </a>
    </a-form-item>

    <a-button type="primary" @click="showModal">
      New Collection
    </a-button>

    <collection-create-form
      ref="collectionForm"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
    />

    <a-form-item
      label="Price comp"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <price-input
        v-decorator="[
          'price',
          {
            initialValue: { number: 0, currency: 'rmb' },
            rules: [{ validator: checkPrice }]
          }
        ]"
      />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label=" 自行处理 Prime between 8 & 12"
      :validate-status="number.validateStatus"
      :help="number.errorMsg || tips"
    >
      <a-input-number
        :min="8"
        :max="12"
        :value="number.value"
        @change="handleNumberChange"
      />
    </a-form-item>

    <a-form-item
      label="date"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      style="margin-bottom:0;"
    >
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        validate-status="error"
        help="Please select the correct date"
        :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
      >
        <a-date-picker style="width: 100%" />
      </a-form-item>
      <span
        :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }"
      >
        -
      </span>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
      >
        <a-date-picker style="width: 100%" />
      </a-form-item>
    </a-form-item>
    <a-form-item
      label="Validating"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      has-feedback
      validate-status="validating"
      help="The information is being validated..."
    >
      <a-cascader :default-value="['1']" :options="[]" />
    </a-form-item>

    <a-form-item
      label="pswd"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      has-feedback
      validate-status="warning"
    >
      <a-input-password placeholder="with input password" />
    </a-form-item>

    <a-form-item
      label="pswd2"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      has-feedback
      validate-status="error"
    >
      <a-input-password
        allow-clear
        placeholder="with input password and allowClear"
      />
    </a-form-item>

    <a-form-item
      label="userName"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      has-feedback
      :validate-status="userNameError() ? 'error' : 'success'"
      :help="userNameError() || 'Should be combination of numbers'"
    >
      <a-input
        allow-clear
        v-decorator="[
          'userName',
          {
            rules: [{ required: true, message: 'Please input your username!' }]
          }
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item
      label="password"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :validate-status="passwordError() ? 'error' : 'warning'"
      :help="passwordError() || ''"
    >
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Please input your Password!' }]
          }
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="Name"
    >
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your name' }] }
        ]"
        placeholder="Please input your name"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="Nickname"
    >
      <a-input
        v-decorator="[
          'nickname',
          {
            rules: [
              { required: checkNick, message: 'Please input your nickname' }
            ]
          }
        ]"
        placeholder="Please input your nickname"
      />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-checkbox :checked="checkNick" @change="handleChange">
        Nickname is required
      </a-checkbox>
    </a-form-item>

    <a-form-item
      label="Note"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'note',
          { rules: [{ required: true, message: 'Please input your note!' }] }
        ]"
      />
    </a-form-item>
    <a-form-item
      label="Gender"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-select
        v-decorator="[
          'gender',
          {
            rules: [{ required: true, message: 'Please select your gender!' }],
            initialValue: 'male'
          }
        ]"
        placeholder="Select a option and change input text above"
        @change="handleSelectChange"
      >
        <a-select-option value="male">
          male
        </a-select-option>
        <a-select-option value="female">
          female
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="formItemLayout.wrapperCol">
      <a-button
        type="primary"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
      >
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import PriceInput from './PriceInput'
import CollectionCreateForm from './CollectionCreateForm'

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
]

//自行处理
function validatePrimeNumber(number) {
  if (number === 11) {
    return {
      validateStatus: 'success',
      errorMsg: null
    }
  }
  return {
    validateStatus: 'error',
    errorMsg: 'The prime between 8 and 12 is 11!'
  }
}
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}
export default {
  components: {
    PriceInput,
    CollectionCreateForm
  },
  data() {
    return {
      confirmDirty: false,
      residences,
      autoCompleteResult: [],
      visible: false,
      hasErrors,
      checkNick: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      number: {
        value: 11
      },
      tips: 'A prime is a natural number great.'
    }
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
            labelCol: {
              xs: { span: 4 },
              sm: { span: 4 }
            },
            wrapperCol: {
              xs: { span: 18 },
              sm: { span: 18 }
            }
          }
        : {}
    },
    buttonItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      // this.form.validateFields()
    })
  },
  methods: {
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    handleWebsiteChange(value) {
      let autoCompleteResult
      if (!value) {
        autoCompleteResult = []
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(
          domain => `${value}${domain}`
        )
      }
      this.autoCompleteResult = autoCompleteResult
    },
    showModal() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    },
    handleCreate() {
      const form = this.$refs.collectionForm.form
      form.validateFields((err, values) => {
        if (err) {
          return
        }
        console.log('Received values of form: ', values)
        form.resetFields()
        this.visible = false
      })
    },
    checkPrice(rule, value, callback) {
      if (value.number > 0) {
        callback()
        return
      }
      callback('Price must greater than zero!')
    },
    handleNumberChange(value) {
      this.number = {
        ...validatePrimeNumber(value),
        value
      }
    },
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleSelectChange(value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    handleChange(e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    },
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('userName') && getFieldError('userName')
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    }
  }
}
</script>
