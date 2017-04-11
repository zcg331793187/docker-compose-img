/**
 * Created by zhoucaiguang on 2017/3/15.
 */


// let schedule = require('node-schedule');

import * as schedule from 'node-schedule';
import * as child_process from 'child_process';
import {configs} from './configs';

const exec = child_process.exec;
// let date = new Date(2017, 11, 21, 5, 30, 0);

exec(configs.exec, (error, stdout, stderr) => {
    console.log('执行了');
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`${stdout}`);
    console.log(`stderr: ${stderr}`);
});


let rule = new schedule.RecurrenceRule();
for (let i in  configs.times){
    if(configs.times[i]){
        rule[i] = configs.times[i];
    }
}


let j = schedule.scheduleJob(rule, function(){





    exec(configs.exec, (error, stdout, stderr) => {
        console.log('执行了');
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`${stdout}`);
        console.log(`stderr: ${stderr}`);
    });

});


