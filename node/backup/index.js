/**
 * Created by zhoucaiguang on 2017/3/15.
 */
"use strict";
// let schedule = require('node-schedule');
const schedule = require('node-schedule');
const child_process = require('child_process');
const configs_1 = require('./configs');
const exec = child_process.exec;
// let date = new Date(2017, 11, 21, 5, 30, 0);
exec(configs_1.configs.exec, (error, stdout, stderr) => {
    console.log('执行了');
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`${stdout}`);
    console.log(`stderr: ${stderr}`);
});
let rule = new schedule.RecurrenceRule();
for (let i in configs_1.configs.times) {
    if (configs_1.configs.times[i]) {
        rule[i] = configs_1.configs.times[i];
    }
}
let j = schedule.scheduleJob(rule, function () {
    exec(configs_1.configs.exec, (error, stdout, stderr) => {
        console.log('执行了');
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
});
