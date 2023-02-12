<template>
  <div class="mb-3">
    <template v-if="sectionData.type == 'header'">
      <p :class="sectionData.style">{{ sectionData.text }}</p>
    </template>
    <template v-if="sectionData.type == 'text'">
      <!-- <p>{{ sectionData }}</p> -->
      <label for="email">{{ sectionData.label }}</label>
      <input
        :type="sectionData.type"
        id="email"
        class="form-control form-control-sm"
        :placeholder="sectionData.label"
        required
        v-model="sectionData.input"
      />
    </template>
    <template
      v-if="sectionData.type == 'radio' || sectionData.type == 'checkbox'"
    >
      <!-- <p>{{ sectionData }}</p> -->
      <label for="email">{{ sectionData.label }}</label>
      <template v-for="(data, index) in sectionData.options" :key="index"
        ><div class="form-check">
          <input
            class="form-check-input"
            :type="sectionData.type"
            :value="data"
            id="flexCheckDefault"
            v-model="sectionData.input"
          />
          <label class="form-check-label" for="flexCheckDefault">
            {{ data }}
          </label>
        </div>
      </template>
    </template>
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
