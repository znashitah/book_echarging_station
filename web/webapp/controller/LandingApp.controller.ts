import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import Input from "sap/m/Input";
import SegmentedButton from "sap/m/SegmentedButton";
import UIComponent from "sap/ui/core/UIComponent";

export default class LandingAppController extends Controller {
    public onSubmit(): void {
        
        
        // Get user ID input
        const userIdInput = this.byId("userIdInput") as Input;
        const userId = userIdInput.getValue();
		
        // Get user type from SegmentedButton
        
        const userTypeToggle = this.byId("userTypeToggle") as SegmentedButton;
        
        
        const oRouter = UIComponent.getRouterFor(this);
        oRouter.navTo("AppOwner");
        MessageToast.show(userId);
        // const selectedKey = userTypeToggle.getSelectedKey(); // Use getSelectedKey() for a stable value


        /*if (!userId || !selectedKey) {
            MessageToast.show("Please enter a User ID and select a type.");
            return;
        }

        // Redirect to the appropriate view
        const oRouter = (this.getOwnerComponent() as UIComponent).getRouter();
        if (selectedKey === "Owner") {
            oRouter.navTo("ownerView");
        } else if (selectedKey === "Customer") {
            oRouter.navTo("customerView");
        }*/
    }
}
