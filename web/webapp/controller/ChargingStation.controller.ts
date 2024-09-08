import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";

export default class ChargingStationController extends Controller {
	private selectedStation: any;  // To store selected charging station
	
    public onInit(): void {
        const chargingstationModel = new JSONModel();
        chargingstationModel.loadData("echargerbackend/chargingstations/db/1");
        console.log(chargingstationModel);
        this.getView()?.setModel(chargingstationModel, "chargingstationModel");

    }
    
    // Function triggered on selecting a charging station
    public onSelectChargingStation(oEvent: any): void {
        const selectedItem = oEvent.getParameter("listItem") || oEvent.getSource();
        const selectedContext = selectedItem.getBindingContext("chargingstationModel");
        this.selectedStation = selectedContext?.getObject();
    } 

    public onRemovechargingstation(): void {
        const chargingstationModel = this.getView()?.getModel("chargingstationModel") as JSONModel;

        if (this.selectedStation) {
            // Use Fetch API to send DELETE request to backend
            fetch(`echargerbackend/chargingstations/${this.selectedStation.stationId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    // Remove the charging station from the frontend model
                    const chargingStations = chargingstationModel.getData();
                    const updatedStations = chargingStations.filter((station: any) => station.stationId !== this.selectedStation.stationId);
                    
                    chargingstationModel.setData(updatedStations);  // Update the model with the new data
                    this.selectedStation = null;  // Clear the selection
                    
                    MessageToast.show("Charging station removed successfully.");
                } else {
                    throw new Error("Failed to delete charging station");
                }
            })
            .catch(error => {
                MessageToast.show("Error removing charging station.");
                console.error("Error:", error);
            });
        } else {
            MessageToast.show("Please select a charging station to remove.");
        }
    }
}
