export type EfficiencyUnitName = "L/100km" | "MPG US" | "MPG UK";

export interface EfficiencyUnit {
	name: EfficiencyUnitName;
	value: number;
}

export class FuelEfficiencyUnitConverter {
	units: EfficiencyUnit[];
	lpkmFuelEfficiency: number;

	constructor(initialValue: number) {
		this.units = [
			{ name: "L/100km", value: initialValue },
			{ name: "MPG US", value: 0 },
			{ name: "MPG UK", value: 0 },
		];
		this.lpkmFuelEfficiency = initialValue;

		this.convert("L/100km");
	}

	convert(currentName: EfficiencyUnitName) {
		const from = this.units.find((u) => u.name === currentName);
		if (!from) return;

		const value = Number(from.value);
		if (Number.isNaN(value) || value === 0) return;

		const baseValue = this.toBase(from.name, value);
		this.lpkmFuelEfficiency = baseValue;

		this.units.forEach((unit) => {
			if (unit.name !== currentName) {
				const converted = this.fromBase(unit.name, baseValue);
				unit.value = Number(converted.toFixed(2));
			}
		});
	}

	private toBase(name: EfficiencyUnitName, value: number): number {
		if (value === 0) return 0;
		switch (name) {
			case "MPG US":
				return 235.214583 / value;
			case "MPG UK":
				return 282.480936 / value;
			case "L/100km":
				return value;
		}
	}

	private fromBase(name: EfficiencyUnitName, baseValue: number): number {
		if (baseValue === 0) return 0;
		switch (name) {
			case "MPG US":
				return 235.214583 / baseValue;
			case "MPG UK":
				return 282.480936 / baseValue;
			case "L/100km":
				return baseValue;
		}
	}
}
