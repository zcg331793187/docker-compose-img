/**
 * Created by zhoucaiguang on 2017/3/24.
 */
import * as titleModel from '../model/title';
import * as imgModel from '../model/img';
import {where} from "sequelize";



export default class title{

    private static instance: title;






    public static index(ctx,next){

        ctx.body = 'title';
    }


    public static async getAllTitle(ctx,next){
        let arg = ctx.params;
        let offset = Number(arg['limit']);
        if(!offset){
            offset = 0;
        }



        let where ={
            'attributes': ['id', 'title','imgThums','status','total'], 'limit': 18,
            offset: offset,
        };


      ctx.body =   await titleModel.getAll(where);

    }


    public static async getTitleDetail(ctx,next){
        let arg = ctx.params;
        let titleId = Number(arg['id']);
        let where = {
            where:{titleId},
            'attributes': ['id', 'url']
        };




        ctx.body =   await imgModel.getAll(where);

    }

    public static async searchTitle(ctx,next){
        let arg = ctx.params;
        let title = String(arg['title']);
        let where = {
            where: {title:{like:'%'+title+'%'}
        },
            'attributes': ['id', 'title','imgThums','status','total']
        };



        ctx.body =   await titleModel.getAll(where);

    }
}