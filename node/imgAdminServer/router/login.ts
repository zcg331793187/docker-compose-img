/**
 * Created by zhoucaiguang on 2017/3/24.
 */



export default class login{

    private static instance: login;



    public static getInstance() {
        if (!login.instance) {
            login.instance = new login();
        }
        return login.instance;
    }

    public static index(ctx,next){

        ctx.body = 'login';
    }

}