import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

export default class UserController extends Controller {
    public onInit(): void {
		const userModel1 = new JSONModel();
        userModel1.loadData("echargerbackend/users/db/1");
        console.log(userModel1);
        this.getView()?.setModel(userModel1, "userModel");

        
    } 
    onShowHello(): void {
		const chargingstationModel= new JSONModel(); 
		chargingstationModel.loadData("echargerbackend/chargingstations/db/1");
		 
		chargingstationModel.attachRequestCompleted(() => {
        this.getView()?.setModel(chargingstationModel, "chargingstationModel");
        
        // Access the first station's location
        const firstStationLocation = chargingstationModel.getProperty("/0/location");

        if (firstStationLocation) {
            // MessageToast.show("Location: " + chargingstationModel.getJSON());
            MessageToast.show("Location: " + firstStationLocation);
        } else {
            MessageToast.show("Location not found");
        }
    	});
     }
}
