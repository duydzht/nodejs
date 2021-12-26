const mongoose = require('mongoose');

const Staff = require('../models/staff');

async function connect() {
    try {
        mongoose.connect(
            'mongodb+srv://phong:020899Pi@cluster0.eirsr.mongodb.net/employee?retryWrites=true&w=majority'
        );
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

Staff.findOne()
    .then((staff) => {
        if (!staff) {
            const newStaff = new Staff({
                name: 'Trần Quang Phong',
                dOB: new Date(1999, 08, 02),
                salaryScale: 1.4,
                startDate: new Date(2020, 01, 01),
                department: 'IT',
                annualLeave: 14,
                image: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
                workTimes: [],
                listInfoList: [],
                bodyTemperature: [],
                vaccineInfo: [],
                infectCovidInfo: [],
                userName: 'staff',
                password: 'staff',
                role: 'staff',
            });
            newStaff.save();
        }
    })
    .catch((error) => {
        console.log(error);
    });

module.exports = connect;
