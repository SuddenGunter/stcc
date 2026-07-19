import Alpine from "alpinejs";

Alpine.data("tripCalculator", () => ({
	show_settings: false,

	efficiency_unit: Alpine.$persist("L/100km"),
	distance_unit: Alpine.$persist("km"),
	price_unit: Alpine.$persist("per liter"),
	fuel_input: Alpine.$persist(0),
	price: Alpine.$persist(1),
	distance: 0,

	eunits: ["L/100km", "MPG UK", "MPG US"],
	dunits: ["km", "mi"],
	punits: ["per liter", "per US gallon"],

	trip_cost() {
		return calc_trip_cost(
			this.distance,
			this.distance_unit as "km" | "mi",
			this.fuel_input,
			this.efficiency_unit as "L/100km" | "MPG US" | "MPG UK",
			this.price,
			this.price_unit as "per liter" | "per US gallon",
		).toFixed(2);
	},
}));

function calc_trip_cost(
	distance: number,
	distance_unit: "km" | "mi",
	fuel_efficiency: number,
	fuel_efficiency_unit: "L/100km" | "MPG US" | "MPG UK",
	fuel_price: number,
	fuel_price_unit: "per liter" | "per US gallon",
): number {
	if (fuel_efficiency === 0) return 0;

	const efficiency_in_l_per_100km = convert_to_l_per_100km(
		fuel_efficiency,
		fuel_efficiency_unit,
	);

	const distance_in_km = convert_distance_to_km(distance, distance_unit);

	const fuel_price_per_liter = convert_fuel_price_to_per_liter(
		fuel_price,
		fuel_price_unit,
	);

	const fuel_consumed_in_liters =
		(efficiency_in_l_per_100km / 100) * distance_in_km;

	return fuel_consumed_in_liters * fuel_price_per_liter;
}

function convert_to_l_per_100km(
	fuel_efficiency: number,
	fuel_efficiency_unit: "L/100km" | "MPG US" | "MPG UK",
): number {
	switch (fuel_efficiency_unit) {
		case "L/100km":
			return fuel_efficiency;
		case "MPG US":
			return 235.214583 / fuel_efficiency;
		case "MPG UK":
			return 282.480936 / fuel_efficiency;
		default:
			throw new Error(`Unknown fuel efficiency unit: ${fuel_efficiency_unit}`);
	}
}

function convert_distance_to_km(
	distance: number,
	distance_unit: "km" | "mi",
): number {
	switch (distance_unit) {
		case "km":
			return distance;
		case "mi":
			return distance * 1.60934;
		default:
			throw new Error(`Unknown distance unit: ${distance_unit}`);
	}
}

function convert_fuel_price_to_per_liter(
	fuel_price: number,
	fuel_price_unit: "per liter" | "per US gallon",
): number {
	switch (fuel_price_unit) {
		case "per liter":
			return fuel_price;
		case "per US gallon":
			return fuel_price / 3.78541;
		default:
			throw new Error(`Unknown fuel price unit: ${fuel_price_unit}`);
	}
}
