const mongoose = require('mongoose');

const Staff = require('../models/staff');

async function connect() {
    try {
        mongoose.connect(
            'mongodb://127.0.0.1:27017/nodejs_asm1'
        );
        console.log('DB CONNECTED!');
    } catch (err) {
        console.log(err);
    }
}

Staff.findOne()
    .then((staff) => {
        if (!staff) {
            const newStaff = new Staff({
                name: 'HOÀNG DUY DUY',
                dOB: new Date(1999, 11, 24),
                salaryScale: 1.1,
                startDate: new Date(2021, 01, 01),
                department: 'IT',
                annualLeave: 10,
                image: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
                workTimes: [],
                listInfoList: [],
                bodyTemperature: [],
                vaccineInfo: [],
                infectCovidInfo: [],
            });
            newStaff.save();
        }
    })
    .catch((error) => {
        console.log(error);
    });

module.exports = connect;
