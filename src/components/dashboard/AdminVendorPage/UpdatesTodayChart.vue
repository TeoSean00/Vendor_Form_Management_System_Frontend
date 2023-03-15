<template>
  <!-- 2nd chart -->
  <div class="col my-auto">
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="card mx-auto" style="width: 88%">
            <!-- first page to do list -->
            <div class="card-body">
              <h5 class="card-title">Updates Today</h5>
              <p class="card-text">
                {{ dataSize }} new updates for Vendor SGXChange today,
                {{ dateToday }}
              </p>
              <div v-if="dataSize == 0">
                <p>There are no new updates for today!</p>
              </div>
              <div v-else>
                <ul class="list-group list-group-flush">
                  <div v-for="(status, form, index) in dummyData">
                    <li v-if="index < 4" class="list-group-item">
                      {{ index + 1 }}. {{ form }} - {{ status }}
                      <a href="#" class="btn btn-sm btn-primary">Go to Form</a>
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
            <div class="card mx-auto" style="width: 88%">
              <div class="card-body">
                <h5 class="card-title">Updates Today</h5>
                <p class="card-text">
                  {{ dataSize }} new updates for Vendor SGXChange today,
                  {{ dateToday }}
                </p>
                <ul class="list-group list-group-flush">
                  <div v-for="(status, form, index) in dummyData">
                    <li v-if="index > 3 && index < 8" class="list-group-item">
                      {{ index + 1 }}. {{ form }} - {{ status }}
                      <a href="#" class="btn btn-sm btn-primary">Go to Form</a>
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
                <h5 class="card-title">Updates Today</h5>
                <p class="card-text">
                  {{ dataSize }} new updates for Vendor SGXChange today,
                  {{ dateToday }}
                </p>
                <ul class="list-group list-group-flush">
                  <div v-for="(status, form, index) in dummyData">
                    <li v-if="index > 7 && index < 12" class="list-group-item">
                      {{ index + 1 }}. {{ form }} - {{ status }}
                      <a href="#" class="btn btn-sm btn-primary">
                        Go to Form
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

<style>
@import 'UpdatesTodayChart.css';
</style>

<script>
import { computed, ref } from 'vue'

export default {
  setup () {
    // ------------------------------------------------------------Bar Chart for To Do List Today Chart------------------------------------------------------------
    const dateToday = computed(() => {
      const date = new Date()
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
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

    return {
      dateToday,
      dummyData,
      dataSize
    }
  }
}
</script>
