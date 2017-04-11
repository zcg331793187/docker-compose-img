/**
 * Created by zhoucaiguang on 2017/3/24.
 */



interface IdbConfigs{
    server:string,
    user:string,
    password:string,
    port:number
    database:string,
    maxSockets?:number,
    timeout?:number,
    DB_PREFIX?:string
}



declare var process:any;



export const dbConfigs:IdbConfigs = {
    server:process.env.DB_HOST?process.env.DB_HOST:'127.0.0.1',
    user:process.env.DB_USER?process.env.DB_USER:'root',
    password:process.env.DB_PASSWORD?process.env.DB_PASSWORD:'root',
    database:process.env.DB_DATABASE,
    port:process.env.DB_PORT?process.env.DB_PORT:'3306',
    maxSockets : 10,//pool使用
    timeout : 1,//pool使用
    DB_PREFIX:'node'
};
