/**
 * Created by zhoucaiguang on 2017/3/24.
 */

import * as imgModel from '../model/img';


export default class img{
    private static instance: img;



    public static getInstance() {
        if (!img.instance) {
            img.instance = new img();
        }
        return img.instance;
    }


    public static index(ctx,next){


        ctx.body = {};

    }


    public static async getAll(ctx,next){


        ctx.body =   await imgModel.getAll();

    }

    public static async getTitleIdImg(ctx,next){

        let getData = ctx.request.body;


        let wheres = {
            where:{
                titleId:getData.titleId
            }
        };



        ctx.body =   await imgModel.getAll(wheres);
    }


}