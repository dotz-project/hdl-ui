import * as SRD from "storm-react-diagrams";
import styles from './Diagram.less';

/**
 * @author Dylan Vorster
 */
export class Application {
	
	activeModel;
	diagramEngine;
	ms_in;
	ms_in_port;
	ms_in_port2;

	constructor() {
		this.diagramEngine = new SRD.DiagramEngine();
		this.diagramEngine.installDefaultFactories();
		this.newModel();
	}

	newModel() {
		this.activeModel = new SRD.DiagramModel();
		this.diagramEngine.setDiagramModel(this.activeModel);
		this.ms_in = new SRD.DefaultNodeModel("MICRO SERVIÇO", "rgb(0,192,255)");
		this.ms_in_port = this.ms_in.addInPort("1");
		this.ms_in_port2 = this.ms_in.addInPort("1");
		this.ms_in.setPosition(100, 100);
		this.activeModel.addAll(this.ms_in);
	}

	getActiveDiagram(){
		return this.activeModel;
	}

	getDiagramEngine(){
		return this.diagramEngine;
	}

	getMsIn(){
		return this.ms_in;
	}

	getMsInPort() {
		return this.ms_in_port;
	}
}
