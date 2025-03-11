const fs = require('fs-extra');
try {
    fs.ensureDirSync('./test-report');
    console.log('folder is created');
    fs.emptyDir('./test-report');
    console.log('folder is empty');
} 

catch (error) {
    console.log('folder is not created'+ error);
}