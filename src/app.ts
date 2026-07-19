import persist from "@alpinejs/persist";
import Alpine from "alpinejs";
import "./fuel/trip_cost_calculator";

declare global {
	interface Window {
		Alpine: typeof Alpine;
	}
}

Alpine.plugin(persist);

window.Alpine = Alpine;
Alpine.start();
