/**
 * Created by zhoucaiguang on 2017/3/24.
 */



export default class url{

    private static instance: url;



    public static getInstance() {
        if (!url.instance) {
            url.instance = new url();
        }
        return url.instance;
    }
    public static index(ctx,next){

        ctx.body = 'url';
    }

}