import Alpine from "alpinejs";
import { FuelEfficiencyUnitConverter } from "./fuel/efficiency_converter";
import { TripCostEstimator } from "./fuel/trip_cost_estimator";

declare global {
	interface Window {
		Alpine: typeof Alpine;
	}
}

Alpine.data("fuelConverter", (x: number) => new FuelEfficiencyUnitConverter(x));
Alpine.data(
	"tripCostEstimator",
	(ef: number, dist: number, price: number) =>
		new TripCostEstimator(ef, dist, price),
);

window.Alpine = Alpine;

Alpine.start();
