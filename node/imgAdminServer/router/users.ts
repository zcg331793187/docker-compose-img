/**
 * Created by zhoucaiguang on 2017/3/24.
 */



export default class users{



    private static instance: users;



    public static getInstance() {
        if (!users.instance) {
            users.instance = new users();
        }
        return users.instance;
    }

    public static index(ctx,next){

        ctx.body = 'users';
    }
}