import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import Input from "sap/m/Input";
import RadioButtonGroup from "sap/m/RadioButtonGroup";
import UIComponent from "sap/ui/core/UIComponent";

export default class LandingAppController extends Controller {
    public onSubmit(): void {
        
        
       
        const oRouter = UIComponent.getRouterFor(this);
        const oRadioButtonGroup = this.byId("userTypeRadioGroup") as RadioButtonGroup;
        const selectedIndex = oRadioButtonGroup.getSelectedIndex();
        MessageToast.show("hello");
        if (selectedIndex === 0) {
			MessageToast.show("hello1");
            // Customer selected
            oRouter.navTo("AppCustomer");
        } else if (selectedIndex === 1) {
			MessageToast.show("hello2");
            // Owner selected
            oRouter.navTo("AppOwner");
        }
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
