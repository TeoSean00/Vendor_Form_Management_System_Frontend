<template>
  <div class="col my-auto">
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-inner">

        <!-- first page for form rejections only -->
        <div class="carousel-item active">
          <div class="card mx-auto border-secondary" style="width: 88%">
            <div class="card-body">
              <div class="border border-light mb-2 p-1">
                <h5 class="card-title">New Form Updates Today</h5>
                <p class="card-text">
                  <strong>{{ filteredUpdateFormData[1] }} new overall</strong> form updates for Vendor {{ vendorDetails ? vendorDetails.name : "" }} today,
                  {{ dateToday }}
                </p>  
              </div>
              <div v-if="filteredUpdateFormData[0].rejected.length == 0">
                <h6 class="mt-2 mb-1">Forms Rejected:</h6>
                <p>There are no new form rejection updates for today!</p>
              </div>
              <div v-else>
                <ul class="list-group list-group-flush p-1">
                  <h6 class="mt-0">Forms Rejected:</h6>
                  <div v-for="(value, index) in filteredUpdateFormData[0].rejected">
                    <li v-if="index < 4" class="list-group-item d-flex justify-content-between align-items-center">
                      {{value[1]["content"]["FormInfo"]["formName"]}} - {{ value[0] }} rejected
                      <a @click="enterForm(value[1].id)" class="btn btn-sm btn-primary d-flex align-items-center">Form</a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- second page for form completed only -->
        <div class="carousel-item">
          <div class="card mx-auto border-secondary" style="width: 88%">
            <div class="card-body">
              <div class="border border-light mb-2 p-1">
                <h5 class="card-title">New Form Updates Today</h5>
                <p class="card-text">
                  <strong>{{ filteredUpdateFormData[1] }} new overall</strong> form updates for Vendor {{ vendorDetails ? vendorDetails.name : "" }} today,
                  {{ dateToday }}
                </p>  
              </div>
              <div v-if="filteredUpdateFormData[0].completed.length == 0">
                <h6 class="mt-2 mb-1">Forms Completed:</h6>
                <p>There are no new form completion updates for today!</p>
              </div>
              <div v-else>
                <ul class="list-group list-group-flush p-1">
                  <h6 class="mt-0">Forms Completed:</h6>
                  <div v-for="(value, index) in filteredUpdateFormData[0].completed">
                    <li v-if="index < 4" class="list-group-item d-flex justify-content-between align-items-center">
                      {{value[1]["content"]["FormInfo"]["formName"]}} - {{ value[0] }} completed
                      <a @click="enterForm(value[1].id)" class="btn btn-sm btn-primary d-flex align-items-center">Form</a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- third page for form assigned only -->
        <div class="carousel-item">
          <div class="card mx-auto border-secondary" style="width: 88%">
            <div class="card-body">
              <div class="border border-light mb-2 p-1">
                <h5 class="card-title">New Form Updates Today</h5>
                <p class="card-text">
                  <strong>{{ filteredUpdateFormData[1] }} new overall</strong> form updates for Vendor {{ vendorDetails ? vendorDetails.name : "" }} today,
                  {{ dateToday }}
                </p>  
              </div>
              <div v-if="filteredUpdateFormData[0].assigned.length == 0">
                <h6 class="mt-2 mb-1">Forms Assigned:</h6>
                <p>There are no new form assignment updates for today!</p>
              </div>
              <div v-else>
                <ul class="list-group list-group-flush p-1">
                  <h6 class="mt-0">Forms Assigned:</h6>
                  <div v-for="(value, index) in filteredUpdateFormData[0].assigned">
                    <li v-if="index < 4" class="list-group-item d-flex justify-content-between align-items-center">
                      {{ value["content"]["FormInfo"]["formName"] }} - assigned to {{ vendorDetails ? vendorDetails.name : "" }}
                      <a @click="enterForm(value.id)" class="btn btn-sm btn-primary d-flex align-items-center">Form</a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>

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
import { computed, ref, watchEffect } from 'vue';
import FormService from "../../../services/form/formService";
import { useRouter } from "vue-router";

export default {
  props: {
    vendorDetails: ""
  },
  setup(props) {
    const router = useRouter();
    function enterForm(vendorFormId) {
      console.log("entering form with vendorFormId> " + vendorFormId);
      router.push({
        path: "/vendorForm",
        query: {
          vendorFormId: vendorFormId,
        },
      });
    }

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

    // Method to check that vendor details have been successfully passed from parent page, to invoke specific dashboard method afterwards
    var formData = ref(null);

    watchEffect(async () => {
      if (props.vendorDetails != null) {
        try {
          formData.value = await FormService.getVendorUpdateForms(props.vendorDetails.id)
            .then((response) => {
              return response;
            }
          )
        }
        catch (error) {
          console.log("getVendorUpdateForms error when called", error);
        }
      }
    })

    // Method to filter the getVendorUpdateForms data into their respective categories to be displayed
    const filteredUpdateFormData = computed(() => {
      const date = new Date()
      let monthNow = (parseInt(date.getMonth()) + 1).toString();
      if (monthNow.length == 1) {
        monthNow = "0" + monthNow;
      }
      let dateNow = parseInt(date.getDate())
      if (dateNow < 10) {
        dateNow = "0" + dateNow.toString()
      }
      var dateToday = date.getFullYear() + "-" + monthNow + "-" + dateNow
      var filteredForms = {
        "rejected": [],
        "completed": [],
        "assigned": []
      }
      var totalUpdates = 0
      if (formData.value) {
        for (let i = 0; i < formData.value.length; i++) {
          if (formData.value[i].status != "deleted") {
            if (formData.value[i].status == "form_completed") {
                let key = "approver"
                let value = formData.value[i]
                filteredForms.completed.push([key, value])
                totalUpdates += 1
                continue;
            }
            // // not allowing vendor to view forms with the status of approver rejecting to admin
            // if (formData.value[i].latestRejectionDate != null || formData.value[i].latestCompletedDate != null) {
            //   if(formData.value[i].latestRejector == "approver") {
            //     // console.log("this form not for vendor viewing", formData.value[i])
            //     continue;
            //   }
            // }
            if (formData.value[i].latestRejectionDate != null && formData.value[i].latestCompletedDate != null) {
              let rejectionDate = formData.value[i].latestRejectionDate.split("T")[0]
              let completedDate = formData.value[i].latestCompletedDate.split("T")[0]
              if (rejectionDate == completedDate) {
                let rejectionTime = formData.value[i].latestRejectionDate.split("T")[1]
                let rejectionTimeList = rejectionTime.split(":")
                let rejectionDuration = (Number(rejectionTimeList[0])*60*60) + (Number(rejectionTimeList[1])*60) + Number(rejectionTimeList[2].split(".")[0])
                let completedTime = formData.value[i].latestCompletedDate.split("T")[1]
                let completedTimeList = completedTime.split(":")
                let completedDuration = (Number(completedTimeList[0])*60*60) + (Number(completedTimeList[1])*60) + Number(completedTimeList[2].split(".")[0])
                if (rejectionDuration > completedDuration) {
                  let key = formData.value[i].latestRejector
                  let value = formData.value[i]
                  filteredForms.rejected.push([key, value])
                  totalUpdates += 1
                }
                else if (rejectionDuration < completedDuration) {
                  let key = formData.value[i].latestCompletor
                  let value = formData.value[i]
                  filteredForms.completed.push([key, value])
                  totalUpdates += 1
                }
              }
            }
            else if (formData.value[i].latestRejectionDate != null) {
              let rejectionDate = formData.value[i].latestRejectionDate.split("T")[0]
              if (rejectionDate == dateToday) {
                let key = formData.value[i].latestRejector
                let value = formData.value[i]
                filteredForms.rejected.push([key, value])
                totalUpdates += 1
              }
            }
            else if (formData.value[i].latestCompletedDate != null) {
              let completedDate = formData.value[i].latestCompletedDate.split("T")[0]
              if (completedDate == dateToday) {
                let key = formData.value[i].latestCompletor
                let value = formData.value[i]
                filteredForms.completed.push([key, value])
                totalUpdates += 1
              }
            }
            else if (formData.value[i].createDate != null) {
              let createDate = formData.value[i].createDate.split("T")[0]
              if (createDate == dateToday) {
                filteredForms.assigned.push(formData.value[i])
                totalUpdates += 1
              }
            }
          }
        }
      }
      console.log(filteredForms)
      return [filteredForms, totalUpdates];
    })

    return {
      dateToday,
      filteredUpdateFormData,
      enterForm
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