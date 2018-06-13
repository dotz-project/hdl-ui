import * as SRD from "storm-react-diagrams";
import styles from './Diagram.less';

// import the custom models
import { CompNodeModel } from "./Custom/CompNodeModel";
import { CompNodeFactory } from "./Custom/CompNodeFactory";
import { SimplePortFactory } from "./Custom/SimplePortFactory";
import { CompPortModel } from "./Custom/CompPortModel";

/**
 * @author Dylan Vorster
 */
export class Application {
	
	activeModel;
	diagramEngine;

	constructor() {
		this.diagramEngine = new SRD.DiagramEngine();

		// register some other factories as well
		this.diagramEngine.installDefaultFactories();
		this.diagramEngine.registerPortFactory(new SimplePortFactory("comp", config => new CompPortModel()));
		this.diagramEngine.registerNodeFactory(new CompNodeFactory());



		//2) setup the diagram model
		var model = new SRD.DiagramModel();
		//3-A) create a default node
		var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
		var port1 = node1.addOutPort("Out");
		node1.setPosition(100, 150);
		//3-B) create our new custom node
		var node2 = new CompNodeModel();
		node2.setPosition(50, 108);

		var node3 = new SRD.DefaultNodeModel("Node 3", "red");
		var port3 = node3.addInPort("In");
		node3.setPosition(150, 150);
		//3-C) link the 2 nodes together
		var link1 = port1.link(node2.getPort("center"));
		var link2 = port3.link(node2.getPort("center"));
		//4) add the models to the root graph
		model.addAll(node1, node2, node3, link1, link2);
		//5) load model into engine
		this.diagramEngine.setDiagramModel(model);

		this.activeModel = model;

		//this.newModel();
	}

	newModel() {
		this.activeModel = new SRD.DiagramModel();
		this.diagramEngine.setDiagramModel(this.activeModel);
	}

	getActiveDiagram(){
		return this.activeModel;
	}

	getDiagramEngine(){
		return this.diagramEngine;
	}

}
