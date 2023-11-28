import {IWish} from "./IWish";

export interface IChild{
    id : number;
    name : string;
    age : number;
    wishes  : IWish[];
}