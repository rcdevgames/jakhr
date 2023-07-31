// HOW TO IMPORT ?
// const Convert = require('location/cash_advanceModel.js'); 
// OR
// import Convert from 'location/cash_advanceModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfcash_advanceModel(data)
// FOR ARRAY
// const data = Convert.listOfcash_advanceModel(data)
const modelOfDatacash_advanceModel = {
	employee_id: '',
	title: '',
	amount: 0,
	description: '',
	cash_date: '',
	due_date: '',
	is_paid: false
};
function listOfcash_advanceModel(data = []) {
  var listData = [modelOfDatacash_advanceModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				employee_id: val.employee_id ?? null,
				title: val.title ?? null,
				amount: val.amount ?? null,
				description: val.description ?? null,
				cash_date: val.cash_date ?? null,
				due_date: val.due_date ?? null,
				is_paid: val.is_paid ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfcash_advanceModel(data = null) {
  var objectData = modelOfDatacash_advanceModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.employee_id = data.employee_id ?? null;
		objectData.title = data.title ?? null;
		objectData.amount = data.amount ?? null;
		objectData.description = data.description ?? null;
		objectData.cash_date = data.cash_date ?? null;
		objectData.due_date = data.due_date ?? null;
		objectData.is_paid = data.is_paid ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfcash_advanceModel: listOfcash_advanceModel,
  objectOfcash_advanceModel: objectOfcash_advanceModel,
};




  