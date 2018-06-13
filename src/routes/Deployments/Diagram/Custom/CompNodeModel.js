import { NodeModel } from "storm-react-diagrams";
import { CompPortModel } from "./CompPortModel";

export class CompNodeModel extends NodeModel {
    constructor() {
        super("comp");
        this.addPort(new CompPortModel("center"));
        /*
        this.addPort(new CompPortModel("top"));
        this.addPort(new CompPortModel("left"));
        this.addPort(new CompPortModel("bottom"));
        this.addPort(new CompPortModel("right"));
        */
    }
}