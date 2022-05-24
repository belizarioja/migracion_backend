const dynamicHash = require('../index');
const fs = require('fs');

(securingData = () => {
    // get the current salt
    const currentSalt = dynamicHash.genSalt().salt;

    console.log('')
    console.log('-- starting securing DB process...');
    console.log('')
    // fetching all users from the example DB
    const users = JSON.parse(fs.readFileSync('examples/db.json', 'utf8')).users;
    // backing up current data into a backup_*.json file
    const backup = dynamicHash.backup(JSON.stringify(users),'json');
    console.log('-- securing users fullName attribute in db...');
    console.log('---------------------------------------------')
    console.log('')
    // replacing sensitive data with encrypted values with current salt
    users.map(user => user.fullName = dynamicHash.encrypt(user.fullName, currentSalt));
    console.log('-- new secured DB:');
    // updated db:
    console.log(users)
})()
