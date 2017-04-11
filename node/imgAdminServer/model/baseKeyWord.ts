/**
 * Created by zhoucaiguang on 2017/3/24.
 */
import * as db from '../db/SequelizeDb';


interface IBaseKeyWord {
    id?:number
    keyName?: string
    isUse?: string
    tips?: number
    times?: Date
}

interface IPostAddData {
    keyName: string
    isUse?: string
    tips: number
}

interface IPosUpdateData {
    keyName?: string
    isUse?: string
    tips?: number
}


export async function getAll(where?) {

    return await db.BaseKeyWordDb.findAll(where);

}

export async function getOne(where:IBaseKeyWord) {


    return await db.BaseKeyWordDb.findOne(where);
}

export async function add(data: IPostAddData) {


    return await db.BaseKeyWordDb.create(data);
}

export async function update(data:IPosUpdateData,where){


    return await db.BaseKeyWordDb.update(data,where);



}


export async function deleteData(where){


    return await db.BaseKeyWordDb.destroy(where);

}