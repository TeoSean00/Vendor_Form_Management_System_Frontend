<template>
    <div class="container">
        <h2 class="mt-3">Admin's Vendor Page Dashboards</h2>
        <div class="row">
            <!-- 1st chart -->
            <div class="col my-auto">
                <Bar
                id="file-status-bar-chart"
                :options="FileStatusBarChartOptions"
                :data="FileStatusBarChart"
                />            
            </div>

            <!-- 2nd chart -->
            <div class="col my-auto">
                <div id="carouselExampleIndicators" class="carousel slide">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="card mx-auto" style="width: 88%;">
                                <div class="card-body">
                                    <h5 class="card-title">Updates Today</h5>
                                    <p class="card-text">{{dataSize}} new updates for Vendor SGXChange today, {{ dateToday }}</p>
                                    <div v-if="dataSize == 0">
                                        <p>There are no new updates for today!</p>
                                    </div>
                                    <div v-else>
                                        <!-- first page to do list -->
                                        <ul class="list-group list-group-flush">
                                            <div v-for="(status, form, index) in dummyData">
                                                <li v-if="index<4" class="list-group-item" style="font-size: 0.85em; padding: 12px;">
                                                    {{ form }} - {{ status }}
                                                    <a href="#" class="btn btn-sm btn-primary">Go to Form</a>
                                                </li>
                                            </div>
                                        </ul>  
                                    </div>
                                </div>
                            </div>     
                        </div>  

                        <!-- second page onwards to do list -->
                        <div v-if="dataSize > 4">
                            <div class="carousel-item">
                                <div class="card mx-auto" style="width: 90%;">
                                    <div class="card-body">
                                        <h5 class="card-title">Updates Today</h5>
                                        <p class="card-text">{{dataSize}} new updates for Vendor SGXChange today, {{ dateToday }}</p>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <div v-for="(status, form, index) in dummyData">
                                            <li v-if="index>3" class="list-group-item">
                                                {{ form }} - {{ status }}
                                                <a href="#" class="btn btn-sm btn-primary">Go to Form</a>
                                            </li>
                                        </div>
                                    </ul>
                                </div>   
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="dataSize > 4">
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 3rd chart -->
            <div class="col my-auto">
                <Bar 
                id="days-spent-per-stakeholder-per-form"
                :options="FormDeadlineBarChartOptions"
                :data="FormDeadlineBarChart"
                />
            </div>
        </div>
    </div>
</template>

<style>
@import 'AdminVendorPageDashboard.css';
</style>

<script>
import { computed, ref } from 'vue';
import { Bar, Line, PolarArea } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, plugins} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, plugins)

export default {
    components: {
        Bar,
        Line,
        PolarArea
    },
    setup() {
        // ------------------------------------------------------------Bar Chart for Forms Statuses------------------------------------------------------------
        // metadata for file status bar chart
        const FileStatusBarChart = ref({
            // labels for each file status in the bar chart
            labels: ['Awaiting Vendor', 'Awaiting Admin', 'Awaiting Approver', 'Completed', "Rejected" ],
            // data values corresponding to each file status bar in the bar chart
            datasets: [{ 
                label: 'Breakdown of Vendor SGXChange\'s form statuses',
                data: [40, 20, 12, 10, 6],            
                backgroundColor: [
                    'rgb(153, 51, 255 )',
                    'rgb(54, 162, 235)',
                    'rgb(255, 128, 0)',
                    'rgb(100, 202, 150)',
                    'rgb(255, 75, 132)',
                ]
            }],
        })
        // configuration options for bar chart
        const FileStatusBarChartOptions = ref({
            chartOptions: {
                responsive: false,
                maintainAspectRatio: true,
            }
        })


        // ------------------------------------------------------------Bar Chart for To Do List Today Chart------------------------------------------------------------
        const dateToday = computed(() => {
            const date = new Date()
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            let dayOfWeek = days[date.getDay()];

            // This arrangement can be altered based on how we want the date's format to appear.
            let currentDate = `${day}/${month}/${year}, ${dayOfWeek}`;
            return currentDate
        })

        const dummyData = ref({
            formA : "Awaiting Vendor",
            formB : "Awaiting Admin",
            formC : "Awaiting Approver",
            formD : "Awaiting Vendor",
            formE : "Awaiting Admin",
            formF : "Awaiting Approver",
            formG : "Awaiting Approver",
        })

        const dataSize = computed(() => {
            const value = dummyData.value
            let count = 0
            for(let v in value) {
                count += 1
            }
            console.log(count)
            return count
        })



        // ------------------------------------------------------------Bar Chart for Forms Deadlines------------------------------------------------------------
        // computed property to order FormDeadlineBarChart x-axis by y-axis values, leftmost least days left to deadline and rightmost most days left to deadline
        const FormDeadlineBarChartSort = computed(() => {
            const labels = ['Form A', 'Form B', 'Form C', 'Form D']
            const values = [8, 2, 12, 6]
            const dict = {}
            for(let i = 0; i<labels.length; i++) {
                dict[labels[i]] = values[i]
            }

            let sortable = []
            for(var labelsort in dict) {
                sortable.push([labelsort, dict[labelsort]])
            }
            sortable.sort(function(a,b) {
                return a[1]-b[1]
            })

            const sorteddict = {}
            for(let index in sortable) {
                sorteddict[sortable[index][0]] = sortable[index][1]
            }

            const finalLabel = []
            const finalValues = []
            for(let i = 0; i < sortable.length; i++) {
                finalLabel.push(sortable[i][0])
                finalValues.push(sortable[i][1])
            }
            console.log(sorteddict, finalLabel, finalValues)
            return ([finalLabel, finalValues])
        })

        // metadata for file status bar chart
        const FormDeadlineBarChart = ref({
            // labels for each file status in the bar chart
            labels: FormDeadlineBarChartSort.value[0],
            // data values corresponding to each file status bar in the bar chart
            datasets: [{ 
                label: 'Vendor SGXChange forms\' days left to deadlines',
                data: FormDeadlineBarChartSort.value[1],            
                backgroundColor: [
                    'rgb(153, 51, 255 )',
                    'rgb(54, 162, 235)',
                    'rgb(255, 128, 0)',
                    'rgb(100, 202, 150)',
                ]
            }],
        })

        // configuration options for bar chart
        const FormDeadlineBarChartOptions = ref({
            chartOptions: {
                responsive: false,
                maintainAspectRatio: true,
            }
        })

        return { FileStatusBarChart, FileStatusBarChartOptions, dateToday, dummyData, dataSize, FormDeadlineBarChart, FormDeadlineBarChartOptions, FormDeadlineBarChartSort }
    }
}
</script>