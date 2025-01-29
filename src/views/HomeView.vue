<template>
  <div class="container">
    <h1>Форма заявки на получение кредита</h1>
    <form @submit.prevent="submitForm" class="loan-form">
      <div class="form-group">
        <label for="age">Возраст</label>
        <input type="number" v-model="person.age" id="age" required>
      </div>
      <div class="form-group">
        <label for="gender">Пол</label>
        <select v-model="person.gender" required>
          <option value="">Выберите пол</option>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
      </div>
      <div class="form-group">
        <label for="education">Уровень образования</label>
        <select v-model="person.education" required>
          <option value="">Выберите образование</option>
          <option value="Среднее">Среднее</option>
          <option value="Высшее">Высшее</option>
          <option value="Послевузовское">Послевузовское</option>
        </select>
      </div>
      <div class="form-group">
        <label for="income">Годовой доход</label>
        <input id="income" type="number" v-model="person.income" required>
      </div>
      <div class="form-group">
        <label for="experience">Опыт работы (лет)</label>
        <input id="experience" type="number" v-model="person.experience" required>
      </div>
      <div class="form-group">
        <label for="homeOwnership">Статус владения жильем</label>
        <select v-model="person.homeOwnership" required>
          <option value="">Выберите статус</option>
          <option value="Собственное">Собственное</option>
          <option value="Аренда">Аренда</option>
          <option value="Ипотека">Ипотека</option>
        </select>
      </div>
      <div class="form-group">
        <label for="loanAmount">Запрашиваемая сумма кредита</label>
        <input id="requestedAmount" type="number" v-model="loan.amount" required>
      </div>
      <div class="form-group">
        <label for="loanIntent">Цель кредита</label>
        <select v-model="loan.intent" required>
          <option value="">Выберите цель</option>
          <option value="Покупка дома">Покупка дома</option>
          <option value="Ремонт">Ремонт</option>
          <option value="Образование">Образование</option>
        </select>
      </div>
      <div class="form-group">
        <label for="loanInterestRate">Процентная ставка по кредиту</label>
        <input id="interestRate" type="number" v-model="loan.interestRate" required>
      </div>
      <div class="form-group">
        <label for="creditHistory">Длина кредитной истории (лет)</label>
        <input id="creditHistory" type="number" v-model="person.creditHistory" required>
      </div>
      <div class="form-group">
        <label for="creditScore">Кредитный рейтинг</label>
        <input id="creditScore" type="number" v-model="person.creditScore" required>
      </div>
      <div class="form-group">
        <label for="previousDefaults">Предыдущие просрочки по кредитам?</label>
        <select v-model="person.previousDefaults" required>
          <option value="">Выберите статус</option>
          <option value="Да">Да</option>
          <option value="Нет">Нет</option>
        </select>
      </div>
      <button type="submit">Отправить заявку</button>
    </form>
    <div v-if="submitted" class="result">
      <h2>Результаты заявки</h2>
      <pre>{{ results }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: {
        age: null,
        gender: '',
        education: '',
        income: null,
        experience: null,
        homeOwnership: '',
        creditHistory: null,
        creditScore: null,
        previousDefaults: ''
      },
      loan: {
        amount: null,
        intent: '',
        interestRate: null
      },
      submitted: false,
      results: '',
      errors: []
    }
  },
  methods: {
    submitForm() {
      this.errors = []; // Очищаем массив ошибок перед проверкой
      if (this.validateForm()) {
        this.processApplication();
        this.submitted = true;
      } else {
        alert('Пожалуйста, исправьте ошибки в форме:\n' + this.errors.join('\n'));
      }
    },
    validateForm() {
      let isValid = true;
      if (this.person.age < 18) {
        this.errors.push('Возраст должен быть не менее 18 лет.');
        isValid = false;
      }
      if (this.person.income < 1000000) {
        this.errors.push('Годовой доход должен быть не менее 1 000 000 рублей.');
        isValid = false;
      }
      if (this.person.experience < 1) {
        this.errors.push('Опыт работы должен быть не менее 1 года.');
        isValid = false;
      }
      if (this.loan.amount < 10000) {
        this.errors.push('Запрашиваемая сумма кредита должна быть не менее 10 000 рублей.');
        isValid = false;
      }
      if (this.person.creditHistory < 0) {
        this.errors.push('Длина кредитной истории не может быть отрицательной.');
        isValid = false;
      }
      if (this.loan.interestRate < 0) {
        this.errors.push('Процентная ставка по кредиту не может быть отрицательной.');
        isValid = false;
      }

      return isValid;
    },
    processApplication() {
      // Логика обработки заявки
      this.results = JSON.stringify({
        person: this.person,
        loan: this.loan
      }, null, 2);
    }
  }
}
</script>
