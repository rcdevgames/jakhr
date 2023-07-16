// HOW TO IMPORT ?
// const Convert = require('location/job_positionModel.js'); 
// OR
// import Convert from 'location/job_positionModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfjob_positionModel(data)
// FOR ARRAY
// const data = Convert.listOfjob_positionModel(data)
const modelOfDatacompany = {
	name: ''
};
const modelOfDatajob_level = {
	name: ''
};
const modelOfDatajob_positionModel = {
	id: '',
	job_level_id: '',
	parent_id: null,
	name: '',
	company_id: '',
	created_at: '',
	updated_at: '',
	deleted: false,
	company: modelOfDatacompany,
	job_level: modelOfDatajob_level
};
function listOfjob_positionModel(data = []) {
  var listData = [modelOfDatajob_positionModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				job_level_id: val.job_level_id ?? null,
				parent_id: val.parent_id ?? null,
				name: val.name ?? null,
				company_id: val.company_id ?? null,
				created_at: val.created_at ?? null,
				updated_at: val.updated_at ?? null,
				deleted: val.deleted ?? null,
				company: objectOfcompany(val.company ?? null),
				job_level: objectOfjob_level(val.job_level ?? null)
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfjob_positionModel(data = null) {
  var objectData = modelOfDatajob_positionModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.job_level_id = data.job_level_id ?? null;
		objectData.parent_id = data.parent_id ?? null;
		objectData.name = data.name ?? null;
		objectData.company_id = data.company_id ?? null;
		objectData.created_at = data.created_at ?? null;
		objectData.updated_at = data.updated_at ?? null;
		objectData.deleted = data.deleted ?? null;
		objectData.company = objectOfcompany(data.company ?? null);
		objectData.job_level = objectOfjob_level(data.job_level ?? null);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfjob_positionModel: listOfjob_positionModel,
  objectOfjob_positionModel: objectOfjob_positionModel,
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
function objectOfjob_level(data = null) {
  var objectData = modelOfDatajob_level;
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



  