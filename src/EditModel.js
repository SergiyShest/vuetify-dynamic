export class EditModel {
	constructor(groupEditDto) {

		this.Columns = [];
		for (var prop in groupEditDto) {
			this[prop] = new EditProperty(prop, groupEditDto[prop]);
			if (!this.Columns.includes(this[prop].Column)) {
				this.Columns.push(this[prop].Column)
			}
		}

	}


}
class EditProperty {

	constructor(name, propDto) {
		this.Name = name;
		this.Text = propDto.Text;
		this.PropertyValues = propDto.Values;
		if (propDto.Column) { this.Column = propDto.Column; } else { this.Column = 1; }
		this.Row = propDto.Row;
		switch (propDto.ValuesType) {
			case "DateTime":
				this.DataType = 'date';
				break;
			case "Int32":
			case "Decimal":
				this.DataType = 'number';
				break;
			default: this.DataType = 'text';
		}
		this.Readonly = propDto.Readonly;

		if (/Prop\d/.test(this.Name)) {
			this.ControlType = 'Select'
		} else {
			this.ControlType = 'TextField'
		}

		this.TargetTypes = propDto.TargetTypes;
		this.EditValue = false;
		this.IsChanged = false;
		this.Init = true;//указание, что начальное значение
		this.Description = propDto.Description;
		this.AvaiableValues = propDto.AvaiableValues;

		this.Auto = false;
		console.log(this.Name)
		if (propDto.Value) {

			if (this.DataType == "DateTime") {
				this.Value = propDto.Value.substr(0, 10);
			} else {
				this.Value = propDto.Value;
			}

			this.DBValue = this.Value;
			this.OldValue = this.Value;
		}
		this.Rules = [];

		if (propDto.Rules) {
			propDto.Rules.forEach(rule => {
				this.Rules.push(eval(rule));
			});
		}
	}

	TryChanged() {
		if (this.Value == this.OldValue) return;
		this.EditValue = true
		this.OldValue = this.Value;
	}


}
