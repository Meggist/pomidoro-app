const getNumberOfDays = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const oneDay = 1000 * 60 * 60 * 24;
    const timeDifference = endDate.getTime() - startDate.getTime()
    return Math.round(timeDifference / oneDay);
}

Handlebars.registerHelper('toString', str => str.slice(13, str.length))
Handlebars.registerHelper('toLowerCase', str =>  str.toLowerCase())
Handlebars.registerHelper('calculateDiffDays', str => getNumberOfDays(str,Date.now()))
Handlebars.registerHelper('makeLink', str => "https://upsa.epam.com/workload/employeeView.do?employeeId=<"+str+">ID")
