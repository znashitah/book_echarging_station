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
        // show a native JavaScript alert
        const recipient = (this.getView()?.getModel('userModel') as JSONModel)?.getProperty("/firstName");
        MessageToast.show("Hello " + recipient);
     }
}
