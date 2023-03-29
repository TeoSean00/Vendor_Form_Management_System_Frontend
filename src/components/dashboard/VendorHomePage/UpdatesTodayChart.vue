<template>
  <!-- 2nd chart -->
  <div class="col my-auto">
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="card mx-auto border-secondary" style="width: 88%">
            <!-- first page to do list -->
            <div class="card-body">
              <div class="border border-light mb-3 p-1">
                <h5 class="card-title">New Form Updates Today</h5>
                <p class="card-text">
                  {{ dataSize }} new form updates for Vendor {{ vendorDetails ? vendorDetails.name : "" }} today,
                  {{ dateToday }}
                </p>  
              </div>
              <div v-if="dataSize == 0">
                <p>There are no new updates for today!</p>
              </div>
              <div v-else>
                <ul class="list-group list-group-flush">
                  <div v-for="(status, form, index) in dummyData">
                    <li v-if="index < 4" class="list-group-item d-flex justify-content-between align-items-center">
                        {{ index + 1 }}. {{ form }} - {{ status }}
                        <a href="#" class="btn btn-sm btn-primary d-flex align-items-center">Form</a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- second page to do list -->
        <div v-if="dataSize > 4">
          <div class="carousel-item">
            <div class="card mx-auto border-secondary" style="width: 88%">
              <div class="card-body">
                <div class="border border-light mb-3 p-1">
                  <h5 class="card-title">New Form Updates Today</h5>
                  <p class="card-text">
                    {{ dataSize }} new form updates for Vendor {{ vendorDetails ? vendorDetails.name : "" }} today,
                    {{ dateToday }}
                  </p>  
                </div>
                <ul class="list-group list-group-flush">
                  <div v-for="(status, form, index) in dummyData">
                    <li v-if="index > 3 && index < 8" class="list-group-item d-flex justify-content-between align-items-center">
                        {{ index + 1 }}. {{ form }} - {{ status }}
                        <a href="#" class="btn btn-sm btn-primary d-flex align-items-center">Form</a>  
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- third page to do list -->
        <div v-if="dataSize > 8">
          <div class="carousel-item">
            <div class="card mx-auto" style="width: 88%">
              <div class="card-body">
                <div class="border border-light mb-3 p-1">
                  <h5 class="card-title">New Form Updates Today</h5>
                  <p class="card-text">
                    {{ dataSize }} new form updates for Vendor {{ vendorDetails ? vendorDetails.name : "" }} today,
                    {{ dateToday }}
                  </p>  
                </div>
                <ul class="list-group list-group-flush">
                  <div v-for="(status, form, index) in dummyData">
                    <li v-if="index > 7 && index < 12" class="list-group-item d-flex justify-content-between align-items-center">
                      {{ index + 1 }}. {{ form }} - {{ status }}
                      <a href="#" class="btn btn-sm btn-primary d-flex align-items-center">
                        Form
                      </a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="dataSize > 4">
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'

export default {
  props: {
    vendorDetails: ""
  },
  setup(props) {
    // ------------------------------------------------------------Bar Chart for To Do List Today Chart------------------------------------------------------------
    const dateToday = computed(() => {
      const date = new Date()
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]
      let dayOfWeek = days[date.getDay()]

      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${day}/${month}/${year}, ${dayOfWeek}`
      return currentDate
    })

    const dummyData = ref({
      formA: 'Awaiting Vendor',
      formB: 'Awaiting Admin',
      formC: 'Awaiting Approver',
      formD: 'Awaiting Vendor',
      formE: 'Awaiting Admin',
      formF: 'Awaiting Approver',
      formG: 'Awaiting Approver',
      formH: 'Awaiting Vendor',
      formI: 'Awaiting Admin',
      formJ: 'Awaiting Approver',
      formK: 'Awaiting Vendor',
      formL: 'Awaiting Admin'
    })

    const dataSize = computed(() => {
      const value = dummyData.value
      let count = 0
      for (let v in value) {
        count += 1
      }
      // console.log(count)
      return count
    })

    // Method to check that vendor details have been successfully passed from parent page, to invoke specific dashboard method afterwards
    watchEffect(async () => {
      if (props.vendorDetails != null) {
        try {
          console.log("Vendor Details passed from parent page successfull> ", props.vendorDetails);
        }
        catch (error) {
          console.log(error);
        }
      }
    })

    return {
      dateToday,
      dummyData,
      dataSize
    }
  }
}
</script>

<style>
  .list-group-item{
    padding: 8px;
  }
  .carousel-control-prev, 
  .carousel-control-next {
      filter: invert(100%);
  }

  .carousel-control-next-icon {
      width: 35px;
      margin-left: 30px;
  }

  .carousel-control-prev-icon {
      width: 35px;
      margin-right: 30px;
  }

  .btn-sm{
      height: 2em;
  }

  .card-body{
      padding: 12px;
  }
</style>