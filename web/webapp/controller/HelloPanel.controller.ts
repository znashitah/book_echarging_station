import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import Dialog from "sap/m/Dialog";
 
 /**
 * @namespace ui5.walkthrough.controller
 */
export default class HelloPanel extends Controller {
    dialog: Dialog; 
	onShowHello(): void {
        // show a native JavaScript alert
        const recipient = (this.getView()?.getModel() as JSONModel)?.getProperty("/recipient/fname");
        MessageToast.show("Hello " + recipient);
     }
     async onOpenDialog(): Promise<void> {
        this.dialog ??= await this.loadFragment({
             name: "ui5.walkthrough.view.HelloDialog"
        }) as Dialog;
        this.dialog.open();
    } 
    onCloseDialog(): void {
        // note: We don't need to chain to the pDialog promise, since this event-handler
        // is only called from within the loaded dialog itself.
        (this.byId("helloDialog") as Dialog)?.close();
        MessageToast.show("Hello ");
    } 
	
	}