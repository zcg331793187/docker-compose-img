/**
 * Created by zhoucaiguang on 2017/3/24.
 */
import * as db from '../db/SequelizeDb';

export async function getOne(where) {


    return await db.Admin.findOne(where);
}

