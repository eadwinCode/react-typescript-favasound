import sc from 'soundcloud';

declare namespace SC{
    interface Options{
        oauth_token?:string;
        redirect_uri?:string;
        client_id?:string;
        baseURL?:string;
        connectURL?:string;
    }
    interface SC{
        initialize(options:Options): void;
        get(path:string,params?:string):any;
        put(path:string,params:string):object;
        post(path:string,params:string):object;
        delete(path:string,params:string):object;
        upload(path:string,params:string):object;
        connect(options?:Options): Promise<any>;
        isConnected():boolean;
        oEmbed (url:string, options:Options):object;
        resolve (url:string):object;
        Recorder:any;
        Promise:Promise<any>;
        stream (trackPath:any, secretToken:any):object;
        connectCallback ():void;
    }
}

declare const SC: SC.SC;
export = SC;
export as namespace SC;