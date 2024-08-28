import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

export default class ChargingStationController extends Controller {
    public onInit(): void {
        const oChargingStationModel = new JSONModel("/path/to/chargingstation/api");
        this.getView().setModel(oChargingStationModel, "chargingStations");
    }
}
