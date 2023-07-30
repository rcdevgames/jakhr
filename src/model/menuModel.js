// HOW TO IMPORT ?
// const Convert = require('location/menuModel.js'); 
// OR
// import Convert from 'location/menuModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfmenuModel(data)
// FOR ARRAY
// const data = Convert.listOfmenuModel(data)
const modelOfDatamenuModel = {
	id: '',
	parent_id: null,
	title: '',
	route: '',
	description: '',
	created_at: '',
	updated_at: '',
	created_by: '',
	updated_by: '',
	deleted: false
};
function listOfmenuModel(data = []) {
  var listData = [modelOfDatamenuModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				parent_id: val.parent_id ?? null,
				title: val.title ?? null,
				route: val.route ?? null,
				description: val.description ?? null,
				created_at: val.created_at ?? null,
				updated_at: val.updated_at ?? null,
				created_by: val.created_by ?? null,
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
function objectOfmenuModel(data = null) {
  var objectData = modelOfDatamenuModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.parent_id = data.parent_id ?? null;
		objectData.title = data.title ?? null;
		objectData.route = data.route ?? null;
		objectData.description = data.description ?? null;
		objectData.created_at = data.created_at ?? null;
		objectData.updated_at = data.updated_at ?? null;
		objectData.created_by = data.created_by ?? null;
		objectData.updated_by = data.updated_by ?? null;
		objectData.deleted = data.deleted ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfmenuModel: listOfmenuModel,
  objectOfmenuModel: objectOfmenuModel,
};




  