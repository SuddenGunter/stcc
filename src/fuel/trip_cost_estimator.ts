export class TripCostEstimator {
	distance: number;
	fuelEfficiency: number;
	fuelPrice: number;

	constructor(fuelEfficiency: number, distance: number, fuelPrice: number) {
		this.fuelEfficiency = fuelEfficiency;
		this.distance = distance;
		this.fuelPrice = fuelPrice;
	}

	get totalCost() {
		return (this.distance / 100) * this.fuelEfficiency * this.fuelPrice;
	}
}
