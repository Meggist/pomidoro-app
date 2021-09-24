import template from './reportsTable.hbs'
import highChart from 'highcharts';

class ReportsTableView {
    constructor(period, type) {
        document.querySelector(`.reports-tabs__${period}`).classList.add('active')
        document.querySelector(`.reports-tabs__${type}`).classList.add('active')
        this.reportsContainer = document.querySelector('.graph__content')
    }

    append = () => this.reportsContainer.innerHTML = template()

    appendHighChart = ({date, data}) => {
        let highChartCategories = []
        let highChartData = {}
        let failStack = 'succeed'
        if (date === 'day') {
            highChartCategories = ['URGENT', 'HIGH', 'MIDDLE', 'LOW', 'FAILED']
            highChartData = {
                urgent: [data.urgent, 0, 0, 0, 0],
                high: [0, data.high, 0, 0, 0],
                middle: [0, 0, data.middle, 0, 0],
                low: [0, 0, 0, data.low, 0],
                failed: [0, 0, 0, 0, data.failed]
            }
        }

        if (date === 'week') {
            highChartCategories = ['MON', 'TUE', 'WED', 'THU', 'FRI']
            highChartData = {
                urgent: data.urgent,
                high: data.high,
                middle: data.middle,
                low: data.low,
                failed: data.failed
            }
            failStack = 'failed'
        }

        console.log(highChartData)
        highChart.chart('highChart', {
            chart: {
                type: 'column',
                backgroundColor: '#2a3f50'
            },
            credits: {enabled: false},
            xAxis: {
                categories: highChartCategories,
                min: 0,
                labels: {
                    style: {
                        color: 'white'
                    }
                },
                minorScale: 1
            },
            plotOptions: {
                column: {/*
                    minPointLength: 0,
                    borderWidth: 0,
                    pointWidth: 40,
                    dataLabels: {
                        align: 'center'
                    },
                    */
                    stacking: 'normal'
                },
                /*
                series: {
                    groupPadding: 0.5
                },
                 */
                legend: {
                    color: 'rgba(141, 165, 184, 1)',
                }
            },
            /*
            tooltip: {
                className: 'tool-tip',
                backgroundColor: 'rgba(219, 234, 245, 0.9)',
                borderColor: 'none',
                useHTML: true,
                borderRadius: 6,
                formatter: function () {
                    const columnValue = this.points.find(item => item.y !== 0).y
                    return `<span style="font-size:12px">${this.x}</span><br>
                        <span>${data.title[0].toUpperCase() + data.title.slice(1)}: ${columnValue}</span>`
                },
                shared: true
            },

             */
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                lineWidth: 1,
                gridLineColor: '#345168',
                labels: {
                    style: {
                        color: 'white'
                    }
                }
            },
            title: {
                text: ''
            },
            series: [
                {
                    name: 'Urgent',
                    data: highChartData.urgent,
                    color: '#E74C3C',
                    stack: 'succeed'
                },
                {
                    name: 'High',
                    data: highChartData.high,
                    color: '#E67E22',
                    stack: 'succeed'
                },
                {
                    name: 'Middle',
                    data: highChartData.middle,
                    color: '#DFB500',
                    stack: 'succeed'
                }, {
                    name: 'Low',
                    data: highChartData.low,
                    color: '#16A085',
                    stack: 'succeed'
                }, {
                    name: 'Failed',
                    data: highChartData.failed,
                    color: '#8DA5B8',
                    stack: failStack
                }]
        });
    }

}

export default ReportsTableView