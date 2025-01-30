<template>
  <div class="container">
    <h1>Добро пожаловать в наш банк</h1>
    <form @submit.prevent="submitForm" class="loan-form">
      <div class="form-group">
        <label for="email">Почта</label>
        <input type="email" v-model="person.email" id="email" required>
      </div>
      <div class="form-group">
        <label for="passe">Пароль</label>
        <input type="password" v-model="person.password" id="password" required>
      </div>
      <button type="submit">Отправить заявку</button>
    </form>
    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>


<script>
import router from '@/router';

export default {
  data() {
    return {
      person: {
        email: '',
        passe: '',
      },
      message: '',
      messageType: 'error'
    }
  },
  methods: {
    submitForm() {
      this.axios.post('http://127.0.0.1:8085/login', {
        email: this.person.email,
        password: this.person.password
      }).then((response) => {
        let token = response.data.token
        localStorage.setItem('jwt', token)
        router.push('/')
      }).catch((err) => {
        this.message = err
      })
    },
  }
}
</script>
