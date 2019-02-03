import * as waveform from 'waveform.js';

declare namespace Waveform {
    interface IWaveformConstructor{
        new(options:Options):Waveform;
    }


    export interface Options{
        container?:HTMLElement;
        canvas?:HTMLCanvasElement;
        data?:any;
        outerColor?:string;
        innerColor?:string;
        interpolate?:boolean;
    }
    interface Waveform extends IWaveformConstructor{
        setData(data:any):any;
      
        setDataInterpolated(data:any):any;
      
        setDataCropped(data:any):any;
      
        update(options:{interpolate:any;data:any}):number[];
      
        redraw():number[];
      
        clear():void;
      
        patchCanvasForIE(canvas: any): (a: any, ...args: any[]) => any
      
        createCanvas(container: any, width: number, height: number): HTMLCanvasElement
      
        expandArray(data:any[], limit:number, defaultValue:any):any[]
      
        linearInterpolate(before:number, after:number, atPoint:number):number;
      
        interpolateArray(data:any[], fitCount:number):any[];
      
        optionsForSyncedStream(options:{playedColor:string;loadedColor:string;defaultColor:string}): {
            whileplaying: (...args: any[]) => any;
            whileloading: () => any;
        }
         
        dataFromSoundCloudTrack(track:any): any;
    }
}

declare const Waveform:Waveform.IWaveformConstructor;
export = Waveform;
export as namespace Waveform;