<script setup>
import Header from '@/components/HeaderComp.vue';
</script>

<template>
  <Header></Header>
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
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>
      <div class="form-group">
        <label for="education">Уровень образования</label>
        <select v-model="person.education" required>
          <option value="">Выберите образование</option>
          <option value="High School">Среднее профисиональное</option>
          <option value="Bachelor">Бакалавриат</option>
          <option value="Master">Магистратура</option>
          <option value="Associate">Ассоциативная программа</option>
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
          <option value="OWN">Собственное</option>
          <option value="RENT">Аренда</option>
          <option value="MORTGAGE">Ипотека</option>
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
          <option value="PERSONAL">Персонально</option>
          <option value="VENTURE">Бизнес</option>
          <option value="EDUCATION">Образование</option>
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
          <option value="Yew">Да</option>
          <option value="No">Нет</option>
        </select>
      </div>
      <button type="submit">Отправить заявку</button>
    </form>
    <div v-if="submitted">
      <h2>Результаты заявки</h2>
      <pre class="result" :class="[err ? 'error' : '', pos ? 'positive' : '']">{{ results }}</pre>
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
      errors: [],
      err: false,
      pos: false
    }
  },
  methods: {
    submitForm() {
      this.errors = [];
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
      if (this.person.income < 1000) {
        this.errors.push('Годовой доход должен быть не менее 1000.');
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
      this.axios.post('http://127.0.0.1:8000/predict', {
        "person_age": this.person.age,
        "person_gender": this.person.gender,
        "person_education": this.person.education,
        "person_income": this.person.income,
        "person_emp_exp": this.person.experience,
        "person_home_ownership": this.person.homeOwnership,
        "loan_amnt": this.loan.amount,
        "loan_intent": this.loan.intent,
        "loan_int_rate": this.loan.interestRate,
        "loan_percent_income": this.loan.interestRate,
        "cb_person_cred_hist_length": this.person.creditHistory,
        "credit_score": this.person.creditScore,
        "previous_loan_defaults_on_file": this.person.previousDefaults
      }).then((response) => {
        if (response.data.prediction === 1) {
          this.results = 'Положительно'
          this.pos = true
          this.err = false
        }
        else {
          this.results = 'Отрицательно'
          this.err = true
          this.pos = false
        }
      }).catch((err) => {
        this.results = err
      })
    }
  }
}
</script>
