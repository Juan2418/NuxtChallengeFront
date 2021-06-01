<template>
  <Form v-model="valid">
    <v-text-field
      v-if="hasName"
      v-model="userInfo.name"
      label="Name"
      required
    />

    <input v-model="userInfo.email" type="email" label="Email" required />

    <input
      v-model="userInfo.password"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      required
      @click:append="showPassword = !showPassword"
    />

    <button :disabled="!valid" @click.prevent="submitForm(userInfo)">
      {{ buttonText }}
    </button>
  </Form>
</template>

<script>
export default {
  name: 'user-auth-form',
  props: ['submitForm', 'buttonText', 'hasName'],
  data() {
    return {
      showPassword: false,
      userInfo: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    valid() {
      return (
        this.userInfo.email.length > 0 && this.userInfo.password.length > 0
      );
    },
  },
};
</script>
