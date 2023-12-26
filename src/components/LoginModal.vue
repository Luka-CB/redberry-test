<template>
  <div class="login-modal-bg" @click="handleCloseModal">
    <div class="login-modal" @click.stop>
      <Spinner v-if="isLoginLoading" />
      <div class="close-btn" @click="handleCloseModal">
        <CloseIcon />
      </div>
      <div class="success-mode" v-if="isLoginSuccess">
        <SuccessIcon />
        <p class="text">წარმატებული ავტორიზაცია</p>
        <button
          class="submit-btn"
          type="submit"
          @click="handleCloseSuccessModal"
        >
          კარგი
        </button>
      </div>
      <form @submit.prevent="handleSubmit" v-else>
        <label for="email">ელ-ფოსტა</label>
        <input
          type="email"
          placeholder="example@redberry.ge"
          v-model="email"
          :class="{ inputError: emailError }"
        />
        <div class="error" v-if="emailError">
          <ErrorIcon />
          <p class="err-msg">{{ emailError }}</p>
        </div>

        <button class="submit-btn" type="submit" :disabled="!email">
          შესვლა
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from "./svgs/CloseIcon.vue";
import ErrorIcon from "./svgs/errorIcon.vue";
import SuccessIcon from "./svgs/SuccessIcon.vue";
import { ref, watchEffect } from "vue";
import { useAuth } from "../store/auth";
import { storeToRefs } from "pinia";
import Spinner from "./Spinner.vue";
import router from "../router";

const email = ref("");
const emailError = ref("");

const emailRule = /.+@(redberry)\.ge$/;

const authStore = useAuth();
const { isError, isLoginLoading, isLoginSuccess } = storeToRefs(authStore);
const { login, toggleAuthModal, acceptAuth } = authStore;

watchEffect(() => {
  if (emailRule.test(email.value)) {
    emailError.value = "";
  }

  if (isError.value) {
    emailError.value = "ელ-ფოსტა არ მოიძებნა";
  } else {
    emailError.value = "";
  }
});

const handleSubmit = () => {
  if (!emailRule.test(email.value)) {
    emailError.value = "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";
    return;
  }

  login(email.value);
};

const handleCloseModal = () => {
  if (isLoginSuccess.value) {
    acceptAuth();
    router.push({ name: "home" });
  } else {
    toggleAuthModal(false);
  }
};

const handleCloseSuccessModal = () => {
  acceptAuth();
  router.push({ name: "home" });
};
</script>
