// HOW TO IMPORT ?
// const Convert = require('location/organizationModel.js'); 
// OR
// import Convert from 'location/organizationModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOforganizationModel(data)
// FOR ARRAY
// const data = Convert.listOforganizationModel(data)

const modelOfDatacompany = {
	name: ''
};
const modelOfDataorganizationModel = {
	id: '',
	name: '',
	company_id: '',
	code: '',
	parent_id: null,
	created_at: '',
	updated_at: '',
	deleted: false,
	company: modelOfDatacompany
};
function listOforganizationModel(data = []) {
  var listData = [modelOfDataorganizationModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				name: val.name ?? null,
				company_id: val.company_id ?? null,
				code: val.code ?? null,
				parent_id: val.parent_id ?? null,
				created_at: val.created_at ?? null,
				updated_at: val.updated_at ?? null,
				deleted: val.deleted ?? null,
				company: objectOfcompany(val.company ?? null)
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOforganizationModel(data = null) {
  var objectData = modelOfDataorganizationModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.name = data.name ?? null;
		objectData.company_id = data.company_id ?? null;
		objectData.code = data.code ?? null;
		objectData.parent_id = data.parent_id ?? null;
		objectData.created_at = data.created_at ?? null;
		objectData.updated_at = data.updated_at ?? null;
		objectData.deleted = data.deleted ?? null;
		objectData.company = objectOfcompany(data.company ?? null);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOforganizationModel: listOforganizationModel,
  objectOforganizationModel: objectOforganizationModel,
};

function objectOfcompany(data = null) {
  var objectData = modelOfDatacompany;
  if (data == null) {
    return null;
  }
  try {
		objectData.name = data.name ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}



  