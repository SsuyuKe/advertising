export type ValidationRule = {
  rule: (value: string, relatedValue?: string) => boolean
  message: string
}

export const createValidator = (rules: ValidationRule[]) => {
  return (value: string, relatedValue?: string) => {
    for (const { rule, message } of rules) {
      if (!rule(value, relatedValue)) {
        return message
      }
    }
    return ''
  }
}

interface Rules {
  loginId: ValidationRule[]
  password: ValidationRule[]
  confirmPassword: ValidationRule[]
}

export const rules: Rules = {
  loginId: [
    {
      rule: (value) => value.length > 0,
      message: '請輸入手機號碼或電子郵箱'
    },
    {
      rule: (value) => /^09\d{8}$/.test(value) || /^\S+@\S+\.\S+$/.test(value),
      message: '格式不正確，請輸入有效的手機號碼或電子郵箱'
    }
  ],
  password: [
    {
      rule: (value) => value.length > 0,
      message: '請輸入密碼'
    },
    {
      rule: (value) => value.length >= 6,
      // TODO:可能要限制中英
      message: '請輸入至少6個字元,不限英文或數字'
    }
  ],
  confirmPassword: [
    {
      rule: (value, relatedValue) => value === relatedValue,
      message: '輸入的密碼不一致'
    }
  ]
}
