import * as SRD from "storm-react-diagrams";
import { CompNodeWidget } from "./CompNodeWidget";
import { CompNodeModel } from "./CompNodeModel";
import * as React from "react";

export class CompNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("comp");
    }

    generateReactWidget(diagramEngine, node) {
        return <CompNodeWidget node={node} size={150} />;
    }

    getNewInstance() {
        return new CompNodeModel();
    }
}