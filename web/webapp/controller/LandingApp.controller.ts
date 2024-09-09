import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import Input from "sap/m/Input";
import SegmentedButton from "sap/m/SegmentedButton";
export default class LandingAppController extends Controller {
    public onSubmit(): void {
        
        MessageToast.show("yes");
    }
}
