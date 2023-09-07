// HOW TO IMPORT ?
// const Convert = require('location/undefinedModel.js'); 
// OR
// import Convert from 'location/undefinedModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfundefinedModel(data)
// FOR ARRAY
// const data = Convert.listOfundefinedModel(data)

const modelOfDatacompany = {
	name: ''
};
const modelOfDataundefinedModel = {
	id: '',
	name: '',
	description: '',
	company_id: '',
	created_at: '',
	updated_at: '',
	deleted: false,
	company: modelOfDatacompany
};
function listOfundefinedModel(data = []) {
  var listData = [modelOfDataundefinedModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				name: val.name ?? null,
				description: val.description ?? null,
				company_id: val.company_id ?? null,
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
function objectOfundefinedModel(data = null) {
  var objectData = modelOfDataundefinedModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.name = data.name ?? null;
		objectData.description = data.description ?? null;
		objectData.company_id = data.company_id ?? null;
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
  listOfundefinedModel: listOfundefinedModel,
  objectOfundefinedModel: objectOfundefinedModel,
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



  