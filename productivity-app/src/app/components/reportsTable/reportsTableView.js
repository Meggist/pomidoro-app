import template from './reportsTable.hbs'
import highChart from 'highcharts';

class ReportsTableView {
    constructor(period, type) {
        document.querySelector(`.reports-tabs__${period}`).classList.add('active')
        document.querySelector(`.reports-tabs__${type}`).classList.add('active')
        this.reportsContainer = document.querySelector('.graph__content')
    }

    append = () => this.reportsContainer.innerHTML = template()

    appendHighChart = ({
                           date, type,
                           data = {
                               urgent: 0, high: 0, middle: 0, low: 0, failed: 0,
                               weekDays: ['MON', 'TUE', 'WED', 'THU',
                                   'FRI', 'SAT', 'SUN']
                           }
                       }) => {
        const {urgent, high, middle, low, failed, weekDays} = data
        let highChartCategories = []
        let highChartData = {}
        let columnOptions = {}
        let seriesOptions = {}
        let failStack = 'succeed'
        if (date === 'day') {
            highChartCategories = ['URGENT', 'HIGH', 'MIDDLE', 'LOW', 'FAILED']
            highChartData = {
                urgent: [urgent, 0, 0, 0, 0],
                high: [0, high, 0, 0, 0],
                middle: [0, 0, middle, 0, 0],
                low: [0, 0, 0, low, 0],
                failed: [0, 0, 0, 0, failed]
            }

            columnOptions = {
                minPointLength: 0,
                borderWidth: 0,
                pointWidth: 40,
                dataLabels: {
                    align: 'center'
                },
                stacking: 'normal'
            }
            seriesOptions = {
                groupPadding: 0.5,
                states: {
                    inactive: {
                        enabled: false,
                    },
                },
            }
        }

        if (date === 'week') {
            highChartCategories = weekDays
            highChartData = {
                urgent: urgent,
                high: high,
                middle: middle,
                low: low,
                failed: failed
            }
            failStack = 'failed'

            columnOptions = {
                borderWidth: 0,
                stacking: 'normal'
            }
            seriesOptions = {
                states: {
                    inactive: {
                        enabled: false,
                    },
                },
            }
        }

        if (date === 'month') {
            highChartCategories = []
            for (let i = 1; i < 31; i++) {
                highChartCategories.push(i.toString())
            }
            highChartData = {
                urgent: urgent,
                high: high,
                middle: middle,
                low: low,
                failed: failed
            }

            columnOptions = {
                borderWidth: 0,
                stacking: 'normal'
            }
            seriesOptions = {
                states: {
                    inactive: {
                        enabled: false,
                    },
                },
            }
        }

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
                    step: 1,
                    style: {
                        color: 'white'
                    }
                }
            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                column: columnOptions,
                series: seriesOptions,
            },
            tooltip: {
                className: 'tool-tip',
                backgroundColor: 'rgba(219, 234, 245, 0.9)',
                borderColor: 'none',
                useHTML: true,
                borderRadius: 6,

                formatter: function () {
                    let tooltipDate

                    if (date === 'day') {
                        tooltipDate = this.x
                    }

                    if (date === 'week' || date === 'month') {
                        tooltipDate = this.series.name
                    }
                    return `<span style="font-size:12px">${tooltipDate}</span><br>
                        <span>${type[0].toUpperCase() + type.slice(1)}: ${this.y}</span>`
                },
                shared: false
            },

            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                lineWidth: 1,
                gridLineColor: '#345168',
                labels: {
                    step: 1,
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