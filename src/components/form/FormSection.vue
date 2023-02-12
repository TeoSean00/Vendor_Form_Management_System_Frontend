<template>
  <div>
    <p>{{ sectionData }}</p>
    <label for="email">{{ sectionData.label }}</label>
    <input
      :type="sectionData.type"
      id="email"
      class="form-control form-control-sm"
      :placeholder="sectionData.label"
      required
      v-model="sectionData.input"
    />
  </div>

  <!-- <div class="form-floating my-2">
    <input
      type="email"
      id="email"
      class="form-control form-control-sm"
      placeholder="Email here"
      required
    />
    <label for="email">Email</label>
  </div>
  <div class="form-floating my-2">
    <input
      type="password"
      id="password"
      class="form-control form-control-sm"
      placeholder="Password here"
      required
    />
    <label for="password">Password</label>
  </div>
  <div class="form-floating my-2">
    <input
      type="password"
      id="password2"
      class="form-control form-control-sm"
      placeholder="Re-enter password here"
      required
    />
    <label for="password2">Re-enter Password</label>
  </div> -->
</template>

<script>
export default {
  props: ["sectionData"],
  setup(props, context) {
    console.log(props);

    return {};
  },
};
</script>
