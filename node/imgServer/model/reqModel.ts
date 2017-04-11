/**
 * Created by zhoucaiguang on 2017/3/8.
 */


import * as rp from 'request-promise';
import * as Promise from 'bluebird';


export interface IRequestOption{
    uri:string,
    headers?:Object,
    qs?:Object,
    body?:Object,
    json?:boolean,
    encoding?:string,
    iSgb2312?:boolean,
    iSEncoding?:boolean,
    iSGzip?:boolean,
    resolveWithFullResponse?:boolean
}

export interface IConfigs{
    iSgb2312?:boolean,
    iSEncoding?:boolean,
    iSGzip?:boolean,
    resolveWithFullResponse?:boolean
    headers?:Object,
}



export enum MethodEnum{
    GET,POST
}


function  processOptions(method:MethodEnum,option:IRequestOption,data:Object,config:IConfigs){



    if(method == MethodEnum.GET){


        option.qs = data;
    }else if(method == MethodEnum.POST){

        option.body = data;


    }else{

        throw ('未知的请求方式');


    }



    if(config.iSgb2312==true){
        option.encoding = null
    }else if(config.iSEncoding==true) {
        option.encoding = null;
    } else if(config.iSGzip==true){
        option.encoding = null;
    }


    if(config.headers){
        option.headers = config.headers
    }


    // console.log(option);



}




function req(uri:string,data:Object,method:MethodEnum,config:IConfigs):Promise<Object>{
    var options:IRequestOption = <IRequestOption>{
        uri:uri,
    };

    if(config.resolveWithFullResponse){
        options.resolveWithFullResponse = true
    }


    processOptions(method,options,data,config);



    return rp(options).then((response)=>{



        return Promise.resolve(response);

    }).catch((err)=>{

        return Promise.reject(err);

    });


}


export function httpGet(uri:string,data:Object={},config:IConfigs):Promise<any>{


    return req(uri,data,MethodEnum.GET,config);


}


export function httpPost(uri:string,data:Object={},config:IConfigs):Promise<Object>{

    return req(uri,data,MethodEnum.POST,config);

}


