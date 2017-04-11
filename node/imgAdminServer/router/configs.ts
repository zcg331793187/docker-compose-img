/**
 * Created by zhoucaiguang on 2017/3/24.
 */

import * as configModel from '../model/configs';


export default class configs {


    public static async getValidAll(ctx, next) {

        let where = {
            attributes: ['id', 'webName', 'isUse']
        };

        ctx.body = await configModel.getAll(where);

    }


    public static async addConfig(ctx, next) {
        let postData = JSON.parse(ctx.request.body);


        let addData = {
            webName: postData.webName,
            config: JSON.stringify(postData.config)
        };


        ctx.body = await configModel.add(addData);


    }


    public static async settingIsUse(ctx, next) {
        let postData = JSON.parse(ctx.request.body);


        let UpdateData = {
            isUse: postData.isUse
        };
        let where = {
            where: {
                id: postData.id
            }
        };


        ctx.body = await configModel.update(where, UpdateData);

    }

    public static async searchWebName(ctx,next){

        let arg = ctx.params;
        let where = {
            where:{
                isUse:1,
                webName:{like:'%'+arg.webName+'%'}
            },
            attributes: ['id', 'webName', 'isUse']
        };

        ctx.body = await configModel.getAll(where);

    }

    public static async configDetail(ctx,next){
        let arg = ctx.params;
        let where = {
            where:{
                id:arg.id
            },
            attributes: ['id', 'webName', 'config']
        };



        ctx.body = await configModel.getOne(where);
    }

    public static async updateConfig(ctx,next){


        let postData = JSON.parse(ctx.request.body);

        let where =  {
            where:{id:postData.id
            }
        };

        let editData = {
            webName: postData.webName,
            config: JSON.stringify(postData.config)
        };
        console.log(editData);



        ctx.body = await configModel.update(where,editData);
    }


    public static async deleteConfig(ctx,next){

        let arg = ctx.params;


        let where = {
            where:{
                id:arg.id
            }
        };




        ctx.body = await configModel.deleteData(where);


    }



}