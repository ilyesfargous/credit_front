<script setup>
import router from '@/router';

const logout = () => {
    localStorage.removeItem('jwt');
    router.push('/login')
}
</script>

<template>
    <header>
        <div>Банк</div>
        <div class="logout" @click="logout">Выйти</div>
    </header>
</template>

<style>
header {
    background: white;
    padding: 1rem 2rem;
    border-radius: 0 0 15px 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    justify-content: space-between;
}

header div {
    font-size: 16px;
}

.logout {
    user-select: none;
    cursor: pointer;
}
</style>