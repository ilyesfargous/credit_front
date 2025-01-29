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
        <input type="password" v-model="person.passe" id="passe" required>
      </div>
      <button type="submit">Отправить заявку</button>
    </form>
    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      person: {
        email: '',
        passe: '',
      },
      message: '',
      messageType: '',
      // Имитация базы данных (в реальном приложении это будет запрос к серверу)
      users: [
        { email: 'user1@example.com', password: 'password123' },
        { email: 'user2@example.com', password: 'password456' }
      ]
    }

    /*
    
                async submitForm() {
                    try {
                        const response = await fetch('/api/login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(this.person)
                        });
                        const data = await response.json();
                        if (data.success) {
                            window.location.href = 'form.html';
                        } else {
                            this.message = data.message || 'Ошибка при входе. Повторите попытку.';
                        }
                    } catch (error) {
                        this.message = 'Ошибка соединения с сервером.';
                    }
                }
    
    */



  },
  methods: {
    submitForm() {
      this.message = '';
      this.messageType = '';

      // Поиск пользователя в "базе данных"
      const user = this.users.find(u => u.email === this.person.email);

      if (user) {
        if (user.password === this.person.passe) {
          window.location.href = 'form.html';
        } else {
          this.message = 'Неверный пароль. Повторите попытку.';
          this.messageType = 'error';
        }
      } else {
        this.message = 'Такого клиента не существует.';
        this.messageType = 'error';
      }
    }
  }
}
</script>
