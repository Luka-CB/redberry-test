<template>
  <div class="row4">
    <div class="input-box">
      <label for="email">ელ-ფოსტა</label>
      <input
        type="email"
        placeholder="Example@redberry.ge"
        v-model="email"
        :class="{
          inputError: values.email.error,
          inputSuccess: values.email.success,
        }"
      />
      <div class="err-msg" v-if="values.email.error">
        <ErrorIcon />
        <p>{{ values.email.error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useForm } from "../../store/form";
import { storeToRefs } from "pinia";
import ErrorIcon from "../svgs/errorIcon.vue";

const props = defineProps(["success"]);

const formStore = useForm();
const { values } = storeToRefs(formStore);
const { setEmail } = formStore;

const email = ref(values.value.email.value || "");
const emailError = ref("");
const emailSuccess = ref(false);

const emailRule = /.+@(redberry)\.ge$/;

watchEffect(() => {
  if (props.success) {
    email.value = "";
  }
});

watchEffect(() => {
  if (email.value && !emailRule.test(email.value)) {
    emailError.value = "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";
  }

  if (email.value && emailRule.test(email.value)) {
    emailError.value = "";
    emailSuccess.value = true;
  } else {
    emailSuccess.value = false;
  }

  setEmail({
    value: email.value,
    error: emailError.value,
    success: emailSuccess.value,
  });
});
</script>
