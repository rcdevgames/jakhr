// HOW TO IMPORT ?
// const Convert = require('location/leave_typeModel.js'); 
// OR
// import Convert from 'location/leave_typeModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfleave_typeModel(data)
// FOR ARRAY
// const data = Convert.listOfleave_typeModel(data)

const modelOfDatacompany = {
	name: ''
};
const modelOfDataleave_typeModel = {
	id: '',
	company_id: '',
	code: null,
	name: '',
	description: '',
	default_total_leave: '',
	created_at: '',
	updated_at: '',
	created_by: '',
	updated_by: '',
	deleted: false,
	company: modelOfDatacompany
};
function listOfleave_typeModel(data = []) {
  var listData = [modelOfDataleave_typeModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				company_id: val.company_id ?? null,
				code: val.code ?? null,
				name: val.name ?? null,
				description: val.description ?? null,
				default_total_leave: val.default_total_leave ?? null,
				created_at: val.created_at ?? null,
				updated_at: val.updated_at ?? null,
				created_by: val.created_by ?? null,
				updated_by: val.updated_by ?? null,
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
function objectOfleave_typeModel(data = null) {
  var objectData = modelOfDataleave_typeModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.company_id = data.company_id ?? null;
		objectData.code = data.code ?? null;
		objectData.name = data.name ?? null;
		objectData.description = data.description ?? null;
		objectData.default_total_leave = data.default_total_leave ?? null;
		objectData.created_at = data.created_at ?? null;
		objectData.updated_at = data.updated_at ?? null;
		objectData.created_by = data.created_by ?? null;
		objectData.updated_by = data.updated_by ?? null;
		objectData.deleted = data.deleted ?? null;
		objectData.company = objectOfcompany(data.company ?? null);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfleave_typeModel: listOfleave_typeModel,
  objectOfleave_typeModel: objectOfleave_typeModel,
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



  