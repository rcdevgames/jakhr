// HOW TO IMPORT ?
// const Convert = require('location/bpjs_configModel.js'); 
// OR
// import Convert from 'location/bpjs_configModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfbpjs_configModel(data)
// FOR ARRAY
// const data = Convert.listOfbpjs_configModel(data)
const modelOfDatabpjs_configModel = {
	id: '',
	deleted: false,
	company_id: '',
	jht: '',
	kesehatan: '',
	jp: '',
	jkm: '',
	jkk: '',
	other_insurance: '',
	created_by: '',
	updated_by: '',
	updated_at: '',
	created_at: ''
};
function listOfbpjs_configModel(data = []) {
  var listData = [modelOfDatabpjs_configModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				deleted: val.deleted ?? null,
				company_id: val.company_id ?? null,
				jht: val.jht ?? null,
				kesehatan: val.kesehatan ?? null,
				jp: val.jp ?? null,
				jkm: val.jkm ?? null,
				jkk: val.jkk ?? null,
				other_insurance: val.other_insurance ?? null,
				created_by: val.created_by ?? null,
				updated_by: val.updated_by ?? null,
				updated_at: val.updated_at ?? null,
				created_at: val.created_at ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfbpjs_configModel(data = null) {
  var objectData = modelOfDatabpjs_configModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.deleted = data.deleted ?? null;
		objectData.company_id = data.company_id ?? null;
		objectData.jht = data.jht ?? null;
		objectData.kesehatan = data.kesehatan ?? null;
		objectData.jp = data.jp ?? null;
		objectData.jkm = data.jkm ?? null;
		objectData.jkk = data.jkk ?? null;
		objectData.other_insurance = data.other_insurance ?? null;
		objectData.created_by = data.created_by ?? null;
		objectData.updated_by = data.updated_by ?? null;
		objectData.updated_at = data.updated_at ?? null;
		objectData.created_at = data.created_at ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfbpjs_configModel: listOfbpjs_configModel,
  objectOfbpjs_configModel: objectOfbpjs_configModel,
};




  