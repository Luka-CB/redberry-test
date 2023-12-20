<template>
  <div class="card">
    <div class="image">
      <img :src="DummyImg" alt="sdsd" />
    </div>
    <h4 class="author">ვიღაც სახელისშვილი</h4>
    <span class="date">02.11.2023</span>
    <h2 class="title">EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა</h2>
    <div class="card-categories">
      <span class="category">მარკეტი</span>
      <span class="category">აპლიკაცია</span>
      <span class="category">ხელოვნური ინტელექტი</span>
    </div>
    <p class="description">
      6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური
      სიზუსტისთვის, ეს პროცესი...
    </p>
    <div class="link">
      <router-link :to="{ name: 'home' }">სრულად ნახვა</router-link>
      <ArrowIcon />
    </div>
  </div>
</template>

<script setup lang="ts">
import DummyImg from "../assets/images/dummy.jpg";
import ArrowIcon from "../components/svgs/ArrowIcon.vue";
</script>
