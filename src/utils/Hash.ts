import {createHash} from "node:crypto";

export class Hash{
    public static make(content){
        return createHash('sha256').update(content).digest('hex')
    }
}