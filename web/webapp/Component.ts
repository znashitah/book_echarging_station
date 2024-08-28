import UIComponent from "sap/ui/core/UIComponent";
import { support } from "sap/ui/Device";

export default class Component extends UIComponent {
    public static metadata = {
        manifest: "json"
    };

    public init(): void {
        super.init();

        // Set device model
        this.setModel(support, "device");

        // Initialize routing
        this.getRouter().initialize();
    }
}
