/**
 * Created by zhoucaiguang on 2017/3/24.
 */
import * as db from '../db/SequelizeDb';


interface IImg {
    id?:number
    url: string
    time?: number
    titleId: number
}






export async function getAll(where?) {

    return await db.ImgDb.findAll(where);

}

export async function getOne(where:IImg) {


    return await db.ImgDb.findOne(where);
}

export async function add(data: IImg) {


    return await db.ImgDb.create(data);
}

export async function update(where,data:IImg){


    return await db.ImgDb.update(data,where);



}