import * as SRD from "storm-react-diagrams";
import styles from './Diagram.less';

/**
 * @author Dylan Vorster
 */
export class Application {
	
	activeModel;
	diagramEngine;

	constructor() {
		this.diagramEngine = new SRD.DiagramEngine();
		this.diagramEngine.installDefaultFactories();
		this.newModel();
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
