//@ts-check
export default {
    getYearMonthDates(year, month) {
        if (!year || !month) {
            let _date = new Date();
            year = _date.getFullYear();
            month = _date.getMonth() + 1;
        }
        let dates = [];
        //第一天
        let firstOfMonth = new Date(year, month - 1, 1);
        let firstDateDay = firstOfMonth.getDay();
        if (firstDateDay === 0) {
            //周日
            firstDateDay = 7
        }
        //最后一天
        let lastOfMonth = new Date(year, month, 0);
        let lastDateDay = lastOfMonth.getDay();
        if (lastDateDay === 0) {
            lastDateDay = 7;
        }
        let lastDateOfMonth = lastOfMonth.getDate();

        let prevMonthDayCount = firstDateDay - 1;
        let lastDateOfPrevMonth = new Date(year, month - 1, 0).getDate();

        for (let i = 0; i < 7 * 6; i++) {
            let enable = false;
            let _month = month;
            let date = i + 1 - prevMonthDayCount;
            let _showDate = date;
            if (date <= 0) {
                _month = month - 1;
                _showDate = lastDateOfPrevMonth + date;
            } else if (date > lastDateOfMonth) {
                _month = month + 1;
                _showDate = _showDate - lastDateOfMonth;
            } else {
                enable = true;
            }
            if (_month === 0) {
                _month = 12;
            }
            if (_month === 13) {
                _month = 1;
            }
            dates.push({
                year,
                month: _month,
                date: date,
                showDate: _showDate,
                enable
            })
        }
        return {
            year,
            month,
            days: dates
        }
    },
    getHours() {
        let result = [];
        for (let i = 0; i < 24; i++) {
            let hour = `${i}`.padStart(2, '0');
            result.push(hour);
        }
        return result
    },
    getMinOrSec() {
        let result = [];
        for (let i = 0; i < 60; i++) {
            let hour = `${i}`.padStart(2, '0');
            result.push(hour);
        }
        return result
    },
    getMonths(rows) {
        let result = [];
        let months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        let cols = Math.round(months.length / rows);
        for(let i=0;i<rows;i++) {
            result[i] = months.slice(i*cols,i*cols+cols);
        }
        return result;
    }
}