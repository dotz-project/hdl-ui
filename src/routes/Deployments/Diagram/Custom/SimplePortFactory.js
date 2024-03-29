import { PortModel, AbstractPortFactory } from "storm-react-diagrams";

export class SimplePortFactory extends AbstractPortFactory {
    
    constructor(type, cb = initialConfig) {
        super(type);
        this.cb = cb;
    }

    getNewInstance(initialConfig){
        return this.cb(initialConfig);
    }
}