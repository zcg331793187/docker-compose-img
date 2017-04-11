/**
 * Created by zhoucaiguang on 2017/3/15.
 */



interface Iconfigs{
    task:string
    times:{
        dayOfWeek?:number
        month?:number
        hour?:number
        minute?:number
        second?:number
    }
    exec:string
}

declare var process:any;


export const configs:Iconfigs ={
    task:"mysql",
    exec:'mysqldump -u '+process.env.DB_USER+' -p'+process.env.DB_PASSWORD+' --databases '+process.env.DB_DATABASE+' >/backup/Nodejs_`date +%F`.sql',
    times:{
        // dayOfWeek:0,//每周的哪一天
        // month:0,//每月
        hour:6,//每小时
        // minute:0,//每分钟
        // second:1,//每分钟的第几秒
    }
};