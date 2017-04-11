/**
 * Created by zhoucaiguang on 2017/3/24.
 */
import * as adminModel from '../model/admin'
import * as  crypto from 'crypto';

// var crypto = require('crypto');  //加载crypto库
// console.log(crypto.getHashes()); //打印支持的hash算法

export default class admin{



    public static index(ctx,next){

        ctx.session.userInfo = ctx.session.userInfo || null;
        console.log('是否登陆：',ctx.session.userInfo);

        if(!ctx.session.userInfo){
            console.log('未登录');
            // ctx.session.userInfo = {'userName':"admin",'passWord':'147258369'};
        }


        // console.log( ctx.session.userInfo);
        // console.log(ctx.session.count);

        ctx.body =ctx.session.userInfo;
    }

    public static loginOut(ctx,next){




        ctx.session.userInfo  ={};



        ctx.body =ctx.session.userInfo;

    }

    public  static async login(ctx,next){


        let postData = JSON.parse(ctx.request.body);
        let content = postData['password'];//加密的明文；
        let sha1 = crypto.createHash('sha1');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
        let md5 = crypto.createHash('md5');
        sha1.update(content);
        md5.update(ctx.request.body);
        let where = {where:{
            userName:postData['userName'],
            passWord:sha1.digest('hex')
        }};
        let isLogin =  await adminModel.getOne(where);

        if(isLogin){

            postData['token'] =md5.digest('hex');
            ctx.body = postData;
        }else{
            ctx.body = postData;
        }



    }

}