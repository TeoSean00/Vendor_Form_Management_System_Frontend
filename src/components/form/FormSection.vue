<template>
  
  <template v-if="sectionData.type == 'header'">
    <p class="mt-3 fs-3 fw-bold" >{{ sectionData.label }}</p>
  </template> 

  <div v-else class="rounded-2 p-4 mt-3 shadow-sm" style="border: 1px lightgray solid">
    <div class="mb-3">
    <!-- Header -->

    <!-- Text Input -->
    <template v-if="sectionData.type == 'text'">
      <div class="row">
        <div class="col-10"><label for="email"><h5>{{ sectionData.label }}</h5></label></div>

        <div v-if="sectionData.required == true" class="col-2 text-end">
          <small style="font-style: italic">Required &nbsp; 
            <span  style="color: red;">★</span>
          </small>
        </div>
        
      </div>
      
      <input
        :type="sectionData.type"
        id="email"
        class="form-control form-control-sm border border-secondary"
        :placeholder="sectionData.label"
        required
        v-model="sectionData.input"
        :disabled="disabled"
      />
    </template>

    <!-- Radio and Checkbox input -->
    <template
      v-if="sectionData.type == 'radio' || sectionData.type == 'checkbox'"
    >
      <div class="row">
        <div class="col-10"><label for="email"><h4>{{ sectionData.label }}</h4></label></div>

        <div v-if="sectionData.required == true" class="col-2 text-end">
          <small style="font-style: italic" >Required &nbsp; 
            <span  style="color: red;">★</span>
          </small>
        </div>
        
      </div>

      <template v-for="(data, index) in sectionData.options" :key="index">
        <div class="form-check">
          <input
            class="form-check-input border border-secondary"
            :type="sectionData.type"
            :value="index"
            id="flexCheckDefault"
            v-model="sectionData.input"
            :disabled="disabled" style="border: 1px solid black;"
          />
          {{ data }}
          <!-- v-if short answer is true -->
          <template v-if="sectionData.shortAnswer">
            <span class=" mx-3">
              :
              <input  v-if="sectionData.input.includes(index)" type="text" 
              v-model="sectionData.shortAnswerArr[index]"
              :disabled="disabled"
              class=" border border-1 border border-secondary"
              >
              <input  v-else type="text" 
              class="border border-secondary"
              value=""
              disabled
              >
            </span>
          </template>
        </div>
      </template>
    </template>


    <!--Approval Section-->
    <template v-if="sectionData.type == 'approval'">
      <div class="text-center">
        <h5 style="font-style: italic;">Approval Section</h5>
        <small style="font-style: italic;">No action required now</small>
      </div>
      
    </template>

    <template v-if="sectionData.type == 'acknowledgement'">
      <div class="text-center">
        <h5 style="font-style: italic;">Acknowledge Section</h5>
        <small style="font-style: italic;">No action required now</small>
      </div>
      
    </template>

    <!-- Number input -->
    <template v-if="sectionData.type == 'number'">

      <div class="row">
        <div class="col-10"><label for="email"><h4>{{ sectionData.label }}</h4></label></div>

        <div v-if="sectionData.required == true" class="col-2 text-end">
          <small style="font-style: italic" >Required &nbsp; 
            <span  style="color: red;">★</span>
          </small>
        </div>
        
      </div>

      <input
        :type="sectionData.type"
        id="email"
        class="form-control form-control-sm border border-secondary"
        :placeholder="sectionData.label"
        required
        v-model="sectionData.input"
        :disabled="disabled"
      />
    </template>

    <!-- Boolean Input -->
    <template v-if="sectionData.type == 'boolean'">
      <div class="row">
        <div class="col-10"><label for="email"><h4>{{ sectionData.label }}</h4></label></div>

        <div v-if="sectionData.required == true" class="col-2 text-end">
          <small style="font-style: italic" >Required &nbsp;;
            <span  style="color: red;">★</span>
          </small>
        </div>
        
      </div>

      <template v-for="(data, index) in sectionData.options" :key="index">
        <div class="form-check">
          <input
            class="form-check-input border border-secondary"
            type="radio"
            :value="data"
            id="flexCheckDefault"
            v-model="sectionData.input"
            :disabled="disabled"
          />
          <label class="form-check-label" for="flexCheckDefault">
            {{ data }}
          </label>
        </div>
      </template>
    </template>

    <!-- Date input -->
    <template v-if="sectionData.type == 'date'">
      <div class="row">
        <div class="col-10"><label for="email"><h4>{{ sectionData.label }}</h4></label></div>

        <div v-if="sectionData.required == true" class="col-2 text-end">
          <small style="font-style: italic" >Required &nbsp; 
            <span  style="color: red;">★</span>
          </small>
        </div>
        
      </div>

      <input
        :type="sectionData.type"
        id="email"
        class="form-control border border-secondary"
        :placeholder="sectionData.label"
        required
        v-model="sectionData.input"
        :disabled="disabled"
      />
    </template>

    <!-- Likert Group -->
    <template v-if="sectionData.type == 'likertGroup'">

      <div class="row">
        <div class="col-10"><label for="email"><h4>{{ sectionData.label }}</h4></label></div>

        <div v-if="sectionData.required == true" class="col-2 text-end">
          <small style="font-style: italic" >Required &nbsp; 
            <span  style="color: red;">★</span>
          </small>
        </div>
        
      </div>

      <table class="table">
        <!-- <thead>
          <tr>
            <th>
              <h4>{{ sectionData.label }}</h4>
            </th>
          </tr>
        </thead> -->
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
              <td>{{ data }} : {{ sectionData.input[index] }} </td>
              <td>
                <input
                  class="border border-secondary"
                  type="radio"
                  value="1"
                  :name="data"
                  v-model="sectionData.input[index]"
                  required
                  :disabled="disabled"
                />
              </td>
              <td>
                <input
                  class=" border border-secondary"
                  type="radio"
                  value="2"
                  :name="data"
                  v-model="sectionData.input[index]"
                  required
                  :disabled="disabled"
                />
              </td>
              <td>
                <input
                  class=" border border-secondary"
                  type="radio"
                  value="3"
                  :name="data"
                  v-model="sectionData.input[index]"
                  required
                  :disabled="disabled"
                />
              </td>
              <td>
                <input
                  class=" border border-secondary"
                  type="radio"
                  value="4"
                  :name="data"
                  v-model="sectionData.input[index]"
                  required
                  :disabled="disabled"
                />
              </td>
              <td>
                <input
                  class=" border border-secondary"
                  type="radio"
                  value="5"
                  :name="data"
                  v-model="sectionData.input[index]"
                  required
                  :disabled="disabled"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
  </div>
  </div>
  
</template>

<script>
export default {
  props: ["sectionData", "disabled"],
  setup() {},
};
</script>
