const Methods = require('../utils/methods');

class AttendanceController {
    // GET /
    getIndex(req, res) {
        const presentMonth = new Date().getMonth();
        const monthConfirmed = req.staff.isConfirm.filter((item) => {
            return item.month === presentMonth;
        });
        let confirmed;
        if (monthConfirmed[0]?.month === presentMonth) {
            confirmed = true;
        }
        confirmed = false;

        res.render('attendance/index', {
            path: '/attendance',
            pageTitle: 'Attendance',
            isStarted: Methods.CheckIsStarted(req.staff),
            confirmed,
        });
    }

    // GET /attendance/start
    getStartWork(req, res) {
        res.render('attendance/startForm', {
            path: '/attendance',
            pageTitle: 'Attendance',
            staff: req.staff,
            isStarted: Methods.CheckIsStarted(req.staff),
            confirmed: false,
        });
    }

    // POST /attendance/start
    postStartWork(req, res) {
        const workPlace = req.body.workPlace;
        const newWorkTimes = {
            startTime: Date.now(),
            workPlace,
            working: true,
            endTime: null,
        };
        req.staff
            .addWorkTimes(newWorkTimes)
            .then((result) => {
                res.redirect('/attendance/infoStart');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // GET /attendance/infoStart
    getInfoStart(req, res) {
        res.render('attendance/startInfo', {
            path: '/attendance',
            pageTitle: 'Attendance',
            lastStart: Methods.getLastStart(req.staff),
            isStarted: Methods.CheckIsStarted(req.staff),
            staff: req.staff,
            confirmed: false,
        });
    }

    // POST /attendance/end
    postEndWork(req, res) {
        const newEndTime = {
            working: false,
            endTime: new Date(),
        };
        req.staff
            .addEndTime(newEndTime)
            .then((result) => {
                res.redirect('/attendance/endInfo');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // GET /attendance/endInfo
    getInfoEnd(req, res) {
        const timeWorked = Methods.timeConvert(Methods.calculateTimeWorked(req.staff));
        res.render('attendance/endInfo', {
            path: '/attendance',
            pageTitle: 'Attendance',
            timeWorked,
            workedInDay: Methods.calculateTimeWorked(req.staff),
            isStarted: Methods.CheckIsStarted(req.staff),
            staff: req.staff,
            confirmed: false,
        });
    }

    // GET /attendance/annulLeave
    getLeaveForm(req, res) {
        res.render('attendance/leaveForm', {
            path: '/attendance',
            pageTitle: 'Attendance',
            staff: req.staff,
            confirmed: false,
        });
    }

    // POST /attendance/info
    postLeaveForm(req, res) {
        req.staff
            .addLeaveInfo({
                daysLeave: req.body.daysLeave,
                timesLeave: req.body.hoursLeave,
                reason: req.body.reason,
            })
            .then(() => {
                res.redirect('/');
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = new AttendanceController();
