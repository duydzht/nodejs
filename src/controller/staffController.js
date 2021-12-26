const Methods = require('../utils/methods');
const deleteFile = require('../utils/fileHelper');
class StaffController {
    //  GET /staff/infoStaff
    getInfoStaff(req, res) {
        res.render('staff/infoStaff', {
            path: '/staff/infoStaff',
            pageTitle: 'Staff Info',
            isStarted: null,
            staff: req.staff,
        });
    }

    // POST /staff/edit
    postEditStaff(req, res) {
        deleteFile(req.staff.image);
        req.staff.image = req.file.path;
        req.staff
            .save()
            .then(() =>
                res.render('staff/infoStaff', {
                    path: '/staff/infoStaff',
                    pageTitle: 'Staff Info',
                    isStarted: null,
                    staff: req.staff,
                })
            )
            .catch((error) => console.log(error));
    }

    // GET /staff/reference
    getReference(req, res) {
        const timeWorked = Methods.timeConvert(Methods.calculateTimeWorked(req.staff));
        const lastTimeWorked = Methods.getLastWork(req.staff);
        const day = Methods.getDayLeave(req.staff, Methods.calculateTimeWorked(req.staff));
        const salary = Methods.getSalary(req.body.month, req.staff);

        let page = +req.query.page || 1;
        let rowPerPage = +req.query.rowPerPage || 2;
        let workTimesInMonth = req.staff.workTimes.filter((workTime) => {
            return workTime.startTime.getMonth() == new Date().getMonth();
        });
        const workTimes = [];

        if (rowPerPage > workTimesInMonth.length) {
            rowPerPage = workTimesInMonth.length;
            for (let i = 0; i < rowPerPage; i++) {
                workTimes.push(workTimesInMonth[i]);
            }
        } else {
            for (let i = 0; i < rowPerPage; i++) {
                workTimes.push(workTimesInMonth[i]);
            }
        }
        res.render('staff/reference', {
            path: '/staff/reference',
            pageTitle: 'Reference staff',
            isStarted: null,
            timeWorked, // Worked time in a day
            lastTimeWorked, // total times last worked
            staff: req.staff, // staff
            day, // arry of info annual leave
            salary,
            workTimes, //list work Time
            currentPage: page,
            hasNextPage: rowPerPage * page < workTimes.length,
            nextPage: page + 1,
            hasPrevPage: page > 1,
            prevPage: page - 1,
            lastPage: Math.ceil(workTimes.length / rowPerPage),
        });
    }

    // POST /staff/reference
    postReference(req, res) {
        const timeWorked = Methods.timeConvert(Methods.calculateTimeWorked(req.staff));
        const lastTimeWorked = Methods.getLastWork(req.staff);
        const day = Methods.getDayLeave(req.staff, Methods.calculateTimeWorked(req.staff));
        const salary = Methods.getSalary(req.body.month, req.staff);

        res.render('staff/reference', {
            path: '/staff/reference',
            pageTitle: 'Reference staff',
            isStarted: null,
            timeWorked, // Worked time in a day
            lastTimeWorked, // total times last worked
            staff: req.staff, // staff
            day, // arry of info annual leave
            salary,
        });
    }
}

module.exports = new StaffController();
