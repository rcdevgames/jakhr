// HOW TO IMPORT ?
// const Convert = require('location/reimburstModel.js'); 
// OR
// import Convert from 'location/reimburstModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfreimburstModel(data)
// FOR ARRAY
// const data = Convert.listOfreimburstModel(data)
const modelOfDatareimburstModel = {
	employee_id: '',
	date: '',
	amount: 0,
	description: '',
	is_paid: false,
	payment_files: null
};
function listOfreimburstModel(data = []) {
  var listData = [modelOfDatareimburstModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				employee_id: val.employee_id ?? null,
				date: val.date ?? null,
				amount: val.amount ?? null,
				description: val.description ?? null,
				is_paid: val.is_paid ?? null,
				payment_files: val.payment_files ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfreimburstModel(data = null) {
  var objectData = modelOfDatareimburstModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.employee_id = data.employee_id ?? null;
		objectData.date = data.date ?? null;
		objectData.amount = data.amount ?? null;
		objectData.description = data.description ?? null;
		objectData.is_paid = data.is_paid ?? null;
		objectData.payment_files = data.payment_files ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfreimburstModel: listOfreimburstModel,
  objectOfreimburstModel: objectOfreimburstModel,
};




  