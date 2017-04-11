/**
 * Created by zhoucaiguang on 2017/3/24.
 */
import * as db from '../db/SequelizeDb';


interface ITitle {
    id?:number
    title?: string
    imgThums?: string
    total?: number
    status: number
}


export async function getAll(where) {

    return await db.TitleDb.findAndCountAll(where);

}

export async function getOne(where:ITitle) {


    return await db.TitleDb.findOne(where);
}

export async function add(data: ITitle) {


    return await db.TitleDb.create(data);
}

export async function update(where,data:ITitle){


    return await db.TitleDb.update(data,where);




}