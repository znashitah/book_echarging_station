import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import Input from "sap/m/Input";
import RadioButtonGroup from "sap/m/RadioButtonGroup";
import UIComponent from "sap/ui/core/UIComponent";

export default class LandingAppController extends Controller {
    public onSubmit(): void {
        const oRouter = UIComponent.getRouterFor(this);
        
        // Get email and password input values
        const emailInput = this.byId("userIdInput") as Input;
        const passwordInput = this.byId("passwordInput") as Input;
        const email = emailInput.getValue();
        const password = passwordInput.getValue();

        // Get user type selection (Customer/Owner)
        const oRadioButtonGroup = this.byId("userTypeRadioGroup") as RadioButtonGroup;
        const selectedIndex = oRadioButtonGroup.getSelectedIndex();
        let selectedUserType: string;
        
        if (selectedIndex === 0) {
            selectedUserType = "customer";
        } else if (selectedIndex === 1) {
            selectedUserType = "owner";
        } else {
            MessageToast.show("Please select a user type.");
            return;
        }

        // Prepare the login payload
        const loginData = {
            email: email,
            password: password
        };

        // Fetch API to send login request to the backend
        fetch("echargerbackend/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Process the response if successful
            } else if (response.status === 401) {
                throw new Error("Invalid email or password");
            } else {
                throw new Error("Failed to login");
            }
        })
        .then(userData => {
            MessageToast.show(`Welcome, ${userData.name}`);

            // Compare the user type returned from the backend with the selected type
            if (userData.type.toLowerCase() === selectedUserType) {
                // Navigate to the appropriate view based on user type
                if (selectedUserType === "customer") {
                    oRouter.navTo("AppCustomer");
                } else if (selectedUserType === "owner") {
                    oRouter.navTo("AppOwner");
                }
            } else {
                // Display an error message if types don't match
                MessageToast.show("Selected user type does not match the account type...");
            }
        })
        .catch(error => {
            MessageToast.show(error.message);
            console.error("Login error:", error);
        });
    }
}
