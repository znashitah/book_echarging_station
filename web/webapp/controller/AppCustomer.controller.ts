import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";


/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppOwnerController extends Controller {
	onInit(): void {
      // set data model on view
        const data = {
           recipient: {
              fname: "World2",
              lname: "Mars"
           }
        };
        const dataModel = new JSONModel(data);
        this.getView()?.setModel(dataModel);
    }

    
};