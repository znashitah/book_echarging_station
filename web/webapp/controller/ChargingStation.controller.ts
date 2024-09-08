import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

export default class ChargingStationController extends Controller {
    public onInit(): void {
        const chargingstationModel = new JSONModel();
        chargingstationModel.loadData("echargerbackend/chargingstations/db/1");
        console.log(chargingstationModel);
        this.getView()?.setModel(chargingstationModel, "chargingstationModel");

    }
}
