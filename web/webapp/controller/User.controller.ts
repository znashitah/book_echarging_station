import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

export default class UserController extends Controller {
    public onInit(): void {
        const oUserModel = new JSONModel("/path/to/user/api");
        this.getView().setModel(oUserModel, "users");
    }
}
