import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import Input from "sap/m/Input";
import RadioButtonGroup from "sap/m/RadioButtonGroup";
import UIComponent from "sap/ui/core/UIComponent";
import Dialog from "sap/m/Dialog";

export default class LandingAppController extends Controller {

	private _addDialog: Dialog | null = null;
	_oDialog: Dialog;

	public onInit(): void {
		// Create a JSON model to hold new user data
		const oNewUserModel = new JSONModel({
			userId: "",
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			type: "CUSTOMER",
			gender: "Male",
			dob: null
		});
		this.getView()?.setModel(oNewUserModel, "newUserModel");
	}


	public onCloseCreateUserDialog(): void {
		this._oDialog.close();
	}
	public async onOpenCreateUserDialog(): Promise<void> {
		this._oDialog ??= await this.loadFragment({
			name: "ui5.walkthrough.view.CreateUserDialog"
		}) as Dialog;
		this._oDialog.open();
		// (this.byId("addChargingStationDialog") as Dialog)?.open();
	}

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
				MessageToast.show(`Welcome, ${userData.firstName}`);

				// Create a new JSONModel to store the user data globally
            	const oUserModel = new JSONModel(userData);
            	// Set the model to the core for global use
            	sap.ui.getCore().setModel(oUserModel, "loggedInUserModel");
            	
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

	public onCreateUser(): void {
		// Get the new user data from the model
		const oNewUserModel = this.getView()?.getModel("newUserModel") as JSONModel;
		const newUser = oNewUserModel.getData();
		if (newUser.dob) {
			const dobDate = new Date(newUser.dob); // Parse the date string
			newUser.dob = dobDate.toISOString().split('T')[0]; // Format as 'yyyy-MM-dd'
		}
		// MessageToast.show(oNewUserModel.getProperty("/dob"));

		// Prepare the payload for creating a new user
		fetch("echargerbackend/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newUser)
		})
			.then(response => {
				if (response.ok) {
					return response.json(); // Process the response if successful
				} else {
					throw new Error("Failed to create user");
				}
			})
			.then(() => {
				MessageToast.show("User created successfully!");
				this.onCloseCreateUserDialog(); // Close the dialog after successful creation
			})
			.catch(error => {
				MessageToast.show(error.message);
				console.error("User creation error:", error);
			});
	}


}
