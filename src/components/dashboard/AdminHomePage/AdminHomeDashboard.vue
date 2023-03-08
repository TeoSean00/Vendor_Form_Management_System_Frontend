<template>
    <div class="container">
        <h2 class="mt-3">Admin's Home Page Dashboards</h2>
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
                <Line
                id="vendor-count-line-chart"
                :options="VendorLineChartOptions"
                :data="VendorLineChart"
                />
            </div>
            <!-- 3rd chart -->
            <div class="col my-auto">
                <PolarArea 
                id="days-spent-per-stakeholder-per-form"
                :options="PolarAreaChartOptions"
                :data="PolarAreaChart"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
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
        // metadata for file status bar chart
        const FileStatusBarChart = ref({
            // labels for each file status in the bar chart
            labels: ['Awaiting Vendor', 'Awaiting Admin', 'Awaiting Approver', 'Completed', "Rejected" ],
            // data values corresponding to each file status bar in the bar chart
            datasets: [{ 
                label: 'Breakdown of overall form statuses',
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

        // metadata for vendor line chart
        const VendorLineChart = ref({
            // labels for each month in the line chart
            labels: ['Jan', 'Mar', 'May', 'July', 'Sep', 'Nov'],
            // data values corresponding to each month in the line chart
            datasets: [{ 
                label: 'Number of vendors over time',
                data: [5, 10, 12, 18, 20, 25],            
                backgroundColor: [
                    'rgb(153, 51, 255 )',
                ]
            }],
        })
        // configuration options for bar chart
        const VendorLineChartOptions = ref({
            chartOptions: {
                responsive: false,
                maintainAspectRatio: true,
            }
        })

        // metadata for Avg days spent per stakeholder polar area chart
        const PolarAreaChart = ref({
            // labels for each stakeholder in the polar area chart
            labels: ['Vendor', 'Admin', 'Approver'],
            // data values corresponding to each stakeholder
            datasets: [{ 
                label: 'Avg days spent on each stakeholder per form',
                data: [5, 10, 8],            
                backgroundColor: [
                    'rgb(153, 51, 255 )',
                    'rgb(54, 162, 235)',
                    'rgb(255, 128, 0)',
                ],
            }],
        })
        // configuration options for bar chart
        const PolarAreaChartOptions = ref({
            chartOptions: {
                responsive: false,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'HELLO'
                    }
                }
            }
        })

        return { FileStatusBarChart, FileStatusBarChartOptions, VendorLineChart, VendorLineChartOptions, PolarAreaChart, PolarAreaChartOptions }
    }
}
</script>