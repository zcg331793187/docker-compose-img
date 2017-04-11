/**
 * Created by zhoucaiguang on 2017/3/27.
 */



import imageService from '../router/imageService';
interface IRouteConfigs {

    method: string
    url: string
    fn: any
}

enum Methods {post,get}



export const config:IRouteConfigs[] =    [
    {
        method:Methods[Methods.get],
        url:'/imgDetail/:titleId',
        fn: imageService.getTitleIdImg
    },
    {
        method:Methods[Methods.get],
        url:'/imgSearch/:title',
        fn: imageService.getSearchTitle
    },
    {
        method:Methods[Methods.get],
        url:'/imgTitles/:limit',
        fn: imageService.getimgTitles
    },
    {
        method:Methods[Methods.get],
        url:'/imgProxy/id/:id',
        fn: imageService.getImgBuffer
    },
    {
        method:Methods[Methods.get],
        url:'/imgProxy/titleId/:titleId',
        fn: imageService.getImgBuffer
    },
    {
        method:Methods[Methods.get],
        url:'/imgtotal',
        fn: imageService.getCount
    }
];