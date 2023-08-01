// HOW TO IMPORT ?
// const Convert = require('location/leaveFormModel.js'); 
// OR
// import Convert from 'location/leaveFormModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfleaveFormModel(data)
// FOR ARRAY
// const data = Convert.listOfleaveFormModel(data)
const modelOfDataleaveFormModel = {
	employee_id: '',
	leave_type: '',
	leave_date: '',
	amount: 0,
	reason: ''
};
function listOfleaveFormModel(data = []) {
  var listData = [modelOfDataleaveFormModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				employee_id: val.employee_id ?? null,
				leave_type: val.leave_type ?? null,
				leave_date: val.leave_date ?? null,
				amount: val.amount ?? null,
				reason: val.reason ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfleaveFormModel(data = null) {
  var objectData = modelOfDataleaveFormModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.employee_id = data.employee_id ?? null;
		objectData.leave_type = data.leave_type ?? null;
		objectData.leave_date = data.leave_date ?? null;
		objectData.amount = data.amount ?? null;
		objectData.reason = data.reason ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfleaveFormModel: listOfleaveFormModel,
  objectOfleaveFormModel: objectOfleaveFormModel,
};




  