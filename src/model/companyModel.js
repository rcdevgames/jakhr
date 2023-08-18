// HOW TO IMPORT ?
// const Convert = require('location/companyModel.js'); 
// OR
// import Convert from 'location/companyModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfcompanyModel(data)
// FOR ARRAY
// const data = Convert.listOfcompanyModel(data)
const modelOfDatacompanyModel = {
	id: '',
	name: '',
	address: '',
	logo: '',
	code: '',
	alias: '',
	is_active: false,
	parent_id: null,
	created_at: ''
};
function listOfcompanyModel(data = []) {
  var listData = [modelOfDatacompanyModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				name: val.name ?? null,
				address: val.address ?? null,
				logo: val.logo ?? null,
				code: val.code ?? null,
				alias: val.alias ?? null,
				is_active: val.is_active ?? null,
				parent_id: val.parent_id ?? null,
				created_at: val.created_at ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfcompanyModel(data = null) {
  var objectData = modelOfDatacompanyModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.name = data.name ?? null;
		objectData.address = data.address ?? null;
		objectData.logo = data.logo ?? null;
		objectData.code = data.code ?? null;
		objectData.alias = data.alias ?? null;
		objectData.is_active = data.is_active ?? null;
		objectData.parent_id = data.parent_id ?? null;
		objectData.created_at = data.created_at ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfcompanyModel: listOfcompanyModel,
  objectOfcompanyModel: objectOfcompanyModel,
};




  