<template>
  <div class="row1">
    <div class="input-box">
      <label for="author">ავტორი *</label>
      <input
        type="text"
        name="author"
        id="author"
        placeholder="შეიყვანეთ ავტორი"
      />
      <ul>
        <li>მინიმუმ 4 სიმბოლო</li>
        <li>მინიმუმ ორი სიტყვა</li>
        <li>მხოლოდ ქართული სიმბოლოები</li>
      </ul>
    </div>
    <div class="input-box">
      <label for="title">სათაური *</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="შეიყვანეთ სათაური"
      />
      <span class="validation">მინიმუმ ორი სიმბოლო</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
