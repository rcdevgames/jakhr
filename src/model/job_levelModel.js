// HOW TO IMPORT ?
// const Convert = require('location/job_levelModel.js'); 
// OR
// import Convert from 'location/job_levelModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfjob_levelModel(data)
// FOR ARRAY
// const data = Convert.listOfjob_levelModel(data)
const modelOfDatacompany = {
	name: ''
};
const modelOfDatajob_levelModel = {
	id: '',
	parent_id: null,
	name: '',
	company_id: '',
	created_at: '',
	updated_at: '',
	deleted: false,
	company: modelOfDatacompany
};
function listOfjob_levelModel(data = []) {
  var listData = [modelOfDatajob_levelModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				parent_id: val.parent_id ?? null,
				name: val.name ?? null,
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
function objectOfjob_levelModel(data = null) {
  var objectData = modelOfDatajob_levelModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.parent_id = data.parent_id ?? null;
		objectData.name = data.name ?? null;
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
  listOfjob_levelModel: listOfjob_levelModel,
  objectOfjob_levelModel: objectOfjob_levelModel,
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



  