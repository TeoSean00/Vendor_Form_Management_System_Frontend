<template>
  <div class="mb-3">
    <!-- Header -->
    <template v-if="sectionData.type == 'header'">
      <p :class="sectionData.style">{{ sectionData.label }}</p>
    </template>

    <!-- Text Input -->
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

    <!-- Radio and Checkbox input -->
    <template
      v-if="sectionData.type == 'radio' || sectionData.type == 'checkbox'"
    >
      <!-- <p>{{ sectionData }}</p> -->
      <label for="email">{{ sectionData.label }}</label>
      <template v-for="(data, index) in sectionData.options" :key="index">
        <div class="form-check">
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

    <!-- Number input -->
    <template v-if="sectionData.type == 'number'">
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

    <!-- Boolean Input -->
    <template v-if="sectionData.type == 'boolean'">
      <!-- <p>{{ sectionData }}</p> -->
      <label for="email">{{ sectionData.label }}</label>
      <template v-for="(data, index) in sectionData.options" :key="index">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
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

    <!-- Date input -->
    <template v-if="sectionData.type == 'date'">
      <!-- <p>{{ sectionData }}</p> -->
      <label for="email">{{ sectionData.label }}</label>
      <input
        :type="sectionData.type"
        id="email"
        class="form-control"
        :placeholder="sectionData.label"
        required
        v-model="sectionData.input"
      />
    </template>

    <!-- Likert Group -->
    <template v-if="sectionData.type == 'likertGroup'">
      <!-- <p>{{ sectionData }}</p> -->

      <table class="table">
        <thead>
          <tr>
            <th>
              {{ sectionData.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td colspan="4" class="text-center">Grade</td>
          </tr>
          <tr>
            <td></td>
            <td>1 (Poor)</td>
            <td>2 (Below Average)</td>
            <td>3 (Average)</td>
            <td>4 (Above Average)</td>
            <td>5 (Good)</td>
          </tr>
          <template v-for="(data, index) in sectionData.options" :key="index">
            <tr>
              <td>{{ data }} {{ sectionData.input }}</td>
              <td>
                <input
                  type="radio"
                  value="1"
                  :name="data"
                  v-model="sectionData.input[index]"
                  required
                />
              </td>
              <td>
                <input
                  type="radio"
                  value="2"
                  :name="data"
                  v-model="sectionData.input[index]"
                  required
                />
              </td>
              <td>
                <input
                  type="radio"
                  value="3"
                  :name="data"
                  v-model="sectionData.input[index]"
                  required
                />
              </td>
              <td>
                <input
                  type="radio"
                  value="4"
                  :name="data"
                  v-model="sectionData.input[index]"
                  required
                />
              </td>
              <td>
                <input
                  type="radio"
                  value="5"
                  :name="data"
                  v-model="sectionData.input[index]"
                  required
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
export default {
  props: ["sectionData"],
  setup() {},
};
</script>
