import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import Fragment from "sap/ui/core/Fragment";
import Dialog from "sap/m/Dialog";
import Input from "sap/m/Input";


export default class ChargingStationController extends Controller {
	private selectedStation: any;  // To store selected charging station
	private _addDialog: Dialog | null = null;
	dialog: Dialog; 
	
    public onInit(): void {
        const chargingstationModel = new JSONModel();
        chargingstationModel.loadData("echargerbackend/chargingstations/db");
        console.log(chargingstationModel);
        this.getView()?.setModel(chargingstationModel, "chargingstationModel");

    }
    
    // Function triggered on selecting a charging station
    public onSelectChargingStation(oEvent: any): void {
        const selectedItem = oEvent.getParameter("listItem") || oEvent.getSource();
        const selectedContext = selectedItem.getBindingContext("chargingstationModel");
        this.selectedStation = selectedContext?.getObject();
    } 

    
    
    
	
}
