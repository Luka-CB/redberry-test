<template>
  <div class="spinner-bg">
    <div class="spinner"></div>
  </div>
</template>

<style lang="scss" scoped>
.spinner-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1a1a1f24;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    width: 70px;
    height: 70px;
    border: 2px solid rgba(0, 0, 0, 0.093);
    border-radius: 50%;
    border-top-color: #1a1a1f;
    border-bottom-color: #1a1a1f;
    animation: spin 600ms linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
