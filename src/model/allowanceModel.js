// HOW TO IMPORT ?
// const Convert = require('location/allowanceModel.js'); 
// OR
// import Convert from 'location/allowanceModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfallowanceModel(data)
// FOR ARRAY
// const data = Convert.listOfallowanceModel(data)
const modelOfDataallowanceModel = {
	id: '',
	allowance_type: '',
	name: '',
	ammount: '',
	is_taxable: false,
	is_final_tax: false,
	employee_id: ''
};
function listOfallowanceModel(data = []) {
  var listData = [modelOfDataallowanceModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				allowance_type: val.allowance_type ?? null,
				name: val.name ?? null,
				ammount: val.ammount ?? null,
				is_taxable: val.is_taxable ?? null,
				is_final_tax: val.is_final_tax ?? null,
				employee_id: val.employee_id ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfallowanceModel(data = null) {
  var objectData = modelOfDataallowanceModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.allowance_type = data.allowance_type ?? null;
		objectData.name = data.name ?? null;
		objectData.ammount = data.ammount ?? null;
		objectData.is_taxable = data.is_taxable ?? null;
		objectData.is_final_tax = data.is_final_tax ?? null;
		objectData.employee_id = data.employee_id ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfallowanceModel: listOfallowanceModel,
  objectOfallowanceModel: objectOfallowanceModel,
};




  