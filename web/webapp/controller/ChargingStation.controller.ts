import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import Fragment from "sap/ui/core/Fragment";
import Dialog from "sap/m/Dialog";
import TimePicker from "sap/m/TimePicker";
import Input from "sap/m/Input";


export default class ChargingStationController extends Controller {
	private selectedStation: any;  // To store selected charging station
	private _addDialog: Dialog | null = null;
	dialog: Dialog;

	public onInit(): void {
		const chargingstationModel = new JSONModel();
		chargingstationModel.loadData("echargerbackend/chargingstations/db/6");
		console.log(chargingstationModel);
		this.getView()?.setModel(chargingstationModel, "chargingstationModel");

	}

	// Function triggered on selecting a charging station
	public onSelectChargingStation(oEvent: any): void {
		const selectedItem = oEvent.getParameter("listItem") || oEvent.getSource();
		const selectedContext = selectedItem.getBindingContext("chargingstationModel");
		this.selectedStation = selectedContext?.getObject();
	}

	public onRemovechargingstation(): void {
		const chargingstationModel = this.getView()?.getModel("chargingstationModel") as JSONModel;

		if (this.selectedStation) {
			// Use Fetch API to send DELETE request to backend
			fetch(`echargerbackend/chargingstations/${this.selectedStation.stationId}`, {
				method: 'DELETE'
			})
				.then(response => {
					if (response.ok) {
						// Remove the charging station from the frontend model
						const chargingStations = chargingstationModel.getData();
						const updatedStations = chargingStations.filter((station: any) => station.stationId !== this.selectedStation.stationId);

						chargingstationModel.setData(updatedStations);  // Update the model with the new data
						this.selectedStation = null;  // Clear the selection

						MessageToast.show("Charging station removed successfully.");
					} else {
						throw new Error("Failed to delete charging station");
					}
				})
				.catch(error => {
					MessageToast.show("Error removing charging station.");
					console.error("Error:", error);
				});
		} else {
			MessageToast.show("Please select a charging station to remove.");
		}

	}
	public async onSaveChargingStation(): Promise<void> {
		this.dialog ??= await this.loadFragment({
			name: "ui5.walkthrough.view.AddChargingStation"
		}) as Dialog;
		this.dialog.open();
		// (this.byId("addChargingStationDialog") as Dialog)?.open();
	}
	onCloseChargingStationDialog(): void {
		// note: We don't need to chain to the pDialog promise, since this event-handler
		// is only called from within the loaded dialog itself.
		(this.byId("addChargingStationDialog") as Dialog)?.close();

	}
	// Add a new charging station using the Fetch API
	public onConfirmAddChargingStation(): void {
		const stationId = (this.byId("StationInput") as Input)?.getValue();
		const location = (this.byId("locationInput") as Input)?.getValue();
		const price = parseFloat((this.byId("priceInput") as Input)?.getValue());
		const contact = (this.byId("contactInput") as Input)?.getValue();
		const userId = (this.byId("UserInput") as Input)?.getValue();

		// Prepare the data in the correct format for the POST request
		const newChargingStation = {
			stationId: parseInt(stationId),
			location: location,
			price: price,
			contact: contact,
			user: {
				userId: parseInt(userId)
			}
		};

		// Make a POST request to add the new charging station
		fetch("echargerbackend/chargingstations", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newChargingStation)
		})
			.then(response => {
				if (response.ok) {
					// Update the model if necessary
					const chargingstationModel = this.getView()?.getModel("chargingstationModel") as JSONModel;
					const chargingStations = chargingstationModel.getData();
					chargingStations.push(newChargingStation);
					chargingstationModel.setData(chargingStations);

					MessageToast.show("Charging station added successfully.");
					this.onCloseChargingStationDialog();
				} else {
					throw new Error("Failed to add charging station");
				}
			})
			.catch(error => {
				MessageToast.show("Error adding charging station.");
				console.error("Error:", error);
			});
	}
	public async onAddScheduleDialogPress(): Promise<void> {
		this.dialog ??= await this.loadFragment({
			name: "ui5.walkthrough.view.AddChargingStationSchedule"
		}) as Dialog;
		this.dialog.open();
		// (this.byId("addChargingStationDialog") as Dialog)?.open();
	}

	public onConfirmAddSchedule(): void {
		const startTimePicker = this.byId("startTimePicker") as TimePicker;
		const endTimePicker = this.byId("endTimePicker") as TimePicker;
		const dayPicker = this.byId("dayPicker") as Input;

		const startTime = startTimePicker.getValue();
		const endTime = endTimePicker.getValue();
		const day = dayPicker.getValue();

		// Validate input
		if (!startTime || !endTime || !day || parseInt(day, 10) < 1 || parseInt(day, 10) > 7) {
			MessageToast.show("Please enter valid start time, end time, and day.");
			return;
		}

		// Prepare schedule data to send to backend
		const newSchedule = {
			startTime: startTime,
			endTime: endTime,
			day: parseInt(day, 10),
			chargingStationId: this.selectedStation.stationId  // Assuming you have a selected station
		};

		fetch("/echargerbackend/schedules", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newSchedule)
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				MessageToast.show("Schedule created successfully!");
				this._addDialog?.close();
			})
			.catch((error) => {
				MessageToast.show("Error creating schedule: " + error.message);
			});
	}

}
