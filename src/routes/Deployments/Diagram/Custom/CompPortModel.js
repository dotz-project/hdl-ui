import * as _ from "lodash";
import { LinkModel, DiagramEngine, PortModel, DefaultLinkModel } from "storm-react-diagrams";

export class CompPortModel extends PortModel {
    position = "top"; // | "bottom" | "left" | "right";

    constructor(pos = "top") {
        super(pos, "comp");
        this.position = pos;
    }

    serialize() {
        return _.merge(super.serialize(), {
            position: this.position
        });
    }

    deSerialize(data, engine) {
        super.deSerialize(data, engine);
        this.position = data.position;
    }

    createLinkModel(){
        return new DefaultLinkModel();
    }
}