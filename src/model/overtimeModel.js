// HOW TO IMPORT ?
// const Convert = require('location/overtimeModel.js'); 
// OR
// import Convert from 'location/overtimeModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfovertimeModel(data)
// FOR ARRAY
// const data = Convert.listOfovertimeModel(data)
const modelOfDataovertimeModel = {
	id: '',
	company_id: '',
	calc_base: '',
	calc_mode: '',
	total_custom: 0,
	work_pattern: '',
	is_approval: false,
	created_at: '',
	created_by: '',
	updated_at: '',
	updated_by: '',
	deleted: false
};
function listOfovertimeModel(data = []) {
  var listData = [modelOfDataovertimeModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				company_id: val.company_id ?? null,
				calc_base: val.calc_base ?? null,
				calc_mode: val.calc_mode ?? null,
				total_custom: val.total_custom ?? null,
				work_pattern: val.work_pattern ?? null,
				is_approval: val.is_approval ?? null,
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
function objectOfovertimeModel(data = null) {
  var objectData = modelOfDataovertimeModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.company_id = data.company_id ?? null;
		objectData.calc_base = data.calc_base ?? null;
		objectData.calc_mode = data.calc_mode ?? null;
		objectData.total_custom = data.total_custom ?? null;
		objectData.work_pattern = data.work_pattern ?? null;
		objectData.is_approval = data.is_approval ?? null;
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
  listOfovertimeModel: listOfovertimeModel,
  objectOfovertimeModel: objectOfovertimeModel,
};




  