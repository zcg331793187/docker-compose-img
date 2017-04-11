/**
 * Created by zhoucaiguang on 2017/3/24.
 */
import * as db from '../db/SequelizeDb';


interface IConfigs {
    id?:number
    webName: string
    isUse?: number
    config: Object
    times?: Date
}


export async function getAll(where?) {

    return await db.Configs.findAll(where);

}

export async function getOne(where) {


    return await db.Configs.findOne(where);
}

export async function add(data: IConfigs) {


    return await db.Configs.create(data);
}

export async function update(where,data){


    return await db.Configs.update(data,where);



}

export async function deleteData(where){


    return await db.Configs.destroy(where);



}