function createTimeInEvent(time) {
    const timePieces = time.split(" ")
    this.timeInEvents.push({
        type: "TimeIn",
        date: timePieces[0],
        hour: parseInt(timePieces[1])
    })
    return this
}

function createTimeOutEvent(time) {
    const timePieces = time.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        date: timePieces[0],
        hour: parseInt(timePieces[1])
    })
    return this
}

function hoursWorkedOnDate(time) {
    const endTime = this.timeOutEvents.find(e => e.date === time)
    const startTime = this.timeInEvents.find(e => e.date === time)
    return (endTime.hour - startTime.hour) / 100
}

function wagesEarnedOnDate(date) {
    return this.hoursWorkedOnDate(date) * this.payPerHour
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + record.allWagesFor(), 0)
}

function createEmployeeRecord(attributes) {
    return {
        firstName: attributes[0],
        familyName: attributes[1],
        title: attributes[2],
        payPerHour: attributes[3],
        timeInEvents: [],
        timeOutEvents: [],
        createTimeInEvent: createTimeInEvent,
        createTimeOutEvent: createTimeOutEvent,
        hoursWorkedOnDate: hoursWorkedOnDate,
        allWagesFor: allWagesFor
    }
}

function createEmployeeRecords(data) {
    return data.map(attributeArray => createEmployeeRecord(attributeArray))
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(record => record.firstName === name)
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}