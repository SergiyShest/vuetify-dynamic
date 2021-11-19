export class EditModel {
	constructor(groupEditDto, editingSamplesCount) {

		for (var prop in groupEditDto) {
			this[prop] = new EditProperty(prop, groupEditDto[prop], editingSamplesCount);
		}
	}
}
class EditProperty {

	constructor(name, propDto, editingSamplesCount) {
		this.Name = name;
		this.Text = propDto.Text;
		this.PropertyValues = propDto.Values;
		this.Column = propDto.Column;
		this.Row = propDto.Row;
        switch(propDto.ValuesType)
        {
           case "DateTime":
               this.DataType='date'; 
               break;
           case "Int32":
            case "Decimal":    
               this.DataType='number'; 
               break;
            default:this.DataType='text';   
        }
		this.Readonly = propDto.Readonly;

        if(/Prop\d/.test(this.Name))
           {
              this.ControlType= 'Select'
           }else{
               this.ControlType= 'TextField'
           }

		this.TargetTypes = propDto.TargetTypes;
		this.EditValue = false;
		this.IsChanged = false;
		this.Init = true;//указание, что начальное значение
		this.Description = propDto.Description;
		this.AvaiableValues = propDto.AvaiableValues;

		this.EditingSamplesCount = editingSamplesCount;
		this.Auto = false;
		console.log(this.Name)
		if (propDto.Value) {

			if (this.DataType=="DateTime") {
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
