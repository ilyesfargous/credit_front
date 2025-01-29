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

<style>
body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #333;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  color: #444;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.loan-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #6c5ce7;
  box-shadow: 0 0 8px rgba(108, 92, 231, 0.3);
  outline: none;
}

button {
  background: #6c5ce7;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

button:hover {
  background: #5a4fcf;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

.result {
  margin-top: 2rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease;
}

.result h2 {
  color: #444;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.result pre {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-family: monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loan-form {
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.form-group input:hover,
.form-group select:hover {
  border-color: #6c5ce7;
}

.message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  animation: fadeIn 0.5s ease;
}

.message.error {
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  color: #c62828;
}

.message.error::before {
  content: '⚠️';
  margin-right: 0.5rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
