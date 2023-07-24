// HOW TO IMPORT ?
// const Convert = require('location/component_nameModel.js'); 
// OR
// import Convert from 'location/component_nameModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfcomponent_nameModel(data)
// FOR ARRAY
// const data = Convert.listOfcomponent_nameModel(data)
const modelOfDatacomponent_nameModel = {
	id: '',
	name: '',
	description: '',
	type: '',
	created_at: '',
	created_by: '',
	updated_at: '',
	updated_by: '',
	deleted: false
};
function listOfcomponent_nameModel(data = []) {
  var listData = [modelOfDatacomponent_nameModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				name: val.name ?? null,
				description: val.description ?? null,
				type: val.type ?? null,
				created_at: val.created_at ?? null,
				created_by: val.created_by ?? null,
				updated_at: val.updated_at ?? null,
				updated_by: val.updated_by ?? null,
				deleted: val.deleted ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfcomponent_nameModel(data = null) {
  var objectData = modelOfDatacomponent_nameModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.name = data.name ?? null;
		objectData.description = data.description ?? null;
		objectData.type = data.type ?? null;
		objectData.created_at = data.created_at ?? null;
		objectData.created_by = data.created_by ?? null;
		objectData.updated_at = data.updated_at ?? null;
		objectData.updated_by = data.updated_by ?? null;
		objectData.deleted = data.deleted ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfcomponent_nameModel: listOfcomponent_nameModel,
  objectOfcomponent_nameModel: objectOfcomponent_nameModel,
};




  