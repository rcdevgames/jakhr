// HOW TO IMPORT ?
// const Convert = require('location/absenModel.js'); 
// OR
// import Convert from 'location/absenModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfabsenModel(data)
// FOR ARRAY
// const data = Convert.listOfabsenModel(data)
const modelOfDataabsenModel = {
	id: '',
	employee: modelOfDataemployee,
	date_in: '',
	date_out: null,
	time_in: '',
	time_out: null,
	description: '',
	created_at: '',
	updated_at: '',
	created_by: '',
	updated_by: ''
};
function listOfabsenModel(data = []) {
  var listData = [modelOfDataabsenModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				employee: objectOfemployee(val.employee ?? null),
				date_in: val.date_in ?? null,
				date_out: val.date_out ?? null,
				time_in: val.time_in ?? null,
				time_out: val.time_out ?? null,
				description: val.description ?? null,
				created_at: val.created_at ?? null,
				updated_at: val.updated_at ?? null,
				created_by: val.created_by ?? null,
				updated_by: val.updated_by ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfabsenModel(data = null) {
  var objectData = modelOfDataabsenModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.employee = objectOfemployee(data.employee ?? null);
		objectData.date_in = data.date_in ?? null;
		objectData.date_out = data.date_out ?? null;
		objectData.time_in = data.time_in ?? null;
		objectData.time_out = data.time_out ?? null;
		objectData.description = data.description ?? null;
		objectData.created_at = data.created_at ?? null;
		objectData.updated_at = data.updated_at ?? null;
		objectData.created_by = data.created_by ?? null;
		objectData.updated_by = data.updated_by ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfabsenModel: listOfabsenModel,
  objectOfabsenModel: objectOfabsenModel,
};

const modelOfDataemployee = {
	id: '',
	name: '',
	employee_id: null
};
function objectOfemployee(data = null) {
  var objectData = modelOfDataemployee;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.name = data.name ?? null;
		objectData.employee_id = data.employee_id ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}



  