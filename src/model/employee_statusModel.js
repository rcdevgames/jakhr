// HOW TO IMPORT ?
// const Convert = require('location/employee_statusModel.js'); 
// OR
// import Convert from 'location/employee_statusModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfemployee_statusModel(data)
// FOR ARRAY
// const data = Convert.listOfemployee_statusModel(data)
const modelOfDataemployee_statusModel = {
	id: '',
	name: '',
	description: null,
	deleted: false,
	created_at: '',
	updated_at: '',
	created_by: null,
	updated_by: null
};
function listOfemployee_statusModel(data = []) {
  var listData = [modelOfDataemployee_statusModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				name: val.name ?? null,
				description: val.description ?? null,
				deleted: val.deleted ?? null,
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
function objectOfemployee_statusModel(data = null) {
  var objectData = modelOfDataemployee_statusModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.name = data.name ?? null;
		objectData.description = data.description ?? null;
		objectData.deleted = data.deleted ?? null;
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
  listOfemployee_statusModel: listOfemployee_statusModel,
  objectOfemployee_statusModel: objectOfemployee_statusModel,
};




  