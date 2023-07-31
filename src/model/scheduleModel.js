// HOW TO IMPORT ?
// const Convert = require('location/scheduleModel.js'); 
// OR
// import Convert from 'location/scheduleModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfscheduleModel(data)
// FOR ARRAY
// const data = Convert.listOfscheduleModel(data)
const modelOfDatascheduleModel = {
	employee_id: '',
	start_date: '',
	end_date: '',
	time_in: '',
	time_out: '',
	title: '',
	description: ''
};
function listOfscheduleModel(data = []) {
  var listData = [modelOfDatascheduleModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				employee_id: val.employee_id ?? null,
				start_date: val.start_date ?? null,
				end_date: val.end_date ?? null,
				time_in: val.time_in ?? null,
				time_out: val.time_out ?? null,
				title: val.title ?? null,
				description: val.description ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfscheduleModel(data = null) {
  var objectData = modelOfDatascheduleModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.employee_id = data.employee_id ?? null;
		objectData.start_date = data.start_date ?? null;
		objectData.end_date = data.end_date ?? null;
		objectData.time_in = data.time_in ?? null;
		objectData.time_out = data.time_out ?? null;
		objectData.title = data.title ?? null;
		objectData.description = data.description ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfscheduleModel: listOfscheduleModel,
  objectOfscheduleModel: objectOfscheduleModel,
};




  