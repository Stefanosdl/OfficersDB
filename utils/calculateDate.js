function calculateDate(date1, date2) {
    var new1 = new Date(date1);
    var new2 = new Date(date2);
    var timeDiff = Math.abs(new2.getTime() - new1.getTime()); 
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}

module.exports.calculateDate = calculateDate;