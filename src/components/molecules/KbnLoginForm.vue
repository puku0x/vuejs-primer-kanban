<template>
  <form novalidate>
    <div class="form-item">
      <label for="email">メールアドレス</label>
      <input type="text" id="email" v-model="email" autocomplete="off" placeholder="foo@domain.com" v-on:focus="resetError">
      <ul class="validation-errors">
        <li v-if="!validation.email.format">email format</li>
        <li v-if="!validation.email.required">email required</li>
      </ul>
    </div>
    <div class="form-item">
      <label for="password">パスワード</label>
      <input type="password" id="password" v-model="password" autocomplete="off" placeholder="xxxx" v-on:focus="resetError">
      <ul class="validation-errors">
        <li v-if="!validation.password.required">password required</li>
      </ul>
    </div>
    <div class="form-actions">
      <KbnButton
        v-bind:disabled="disableLoginAction"
        v-on:click="handleClick"
      >ログイン</KbnButton>
      <p class="login-progress" v-if="progress">ログイン中...</p>
      <p class="login-error" v-if="error">{{ error }}</p>
    </div>
  </form>
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton.vue'

const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const required = val => !!val.trim()

export default {
  name: 'KbnLoginForm',
  components: {
    KbnButton
  },
  props: {
    onlogin: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      email: '',
      password: '',
      progress: false,
      error: ''
    }
  },
  computed: {
    validation() {
      return {
        email: {
          required: required(this.email),
          format: REGEX_EMAIL.test(this.email)
        },
        password: {
          required: required(this.password),
        }
      }
    },
    valid() {
      const validation = this.validation
      const fields = Object.keys(validation)
      let valid = true
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        valid = Object.keys(validation[field]).every(key => validation[field][key])
        if (!valid) {
          break
        }
      }
      return valid
    },
    disableLoginAction() {
      return !this.valid || this.progress
    }
  },
  methods: {
    resetError() {
      this.error = ''
    },
    handleClick(e) {
      if (this.disableLoginAction) {
        return
      }

      this.progress = true
      this.error = ''

      this.$nextTick(() => {
        this.onlogin({
          email: this.email,
          password: this.password
        }).catch(err => {
          this.error = err.message
        }).then(() => {
          this.progress = false
        })
      })
    }
  }
}
</script>

<style scoped>
  form {
    display: block;
    margin: 0 auto;
    text-align: left;
  }
  label {
    display: block;
  }
  input {
    width: 100%;
    padding: 0.5em;
    font: inherit;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0.25em 0;
  }
  ul li {
    font-size: 0.5em;
  }
  .validation-errors {
    height: 32px;
  }
  .form-actions {
    font-size: 0.5em;
  }
</style>


