// HOW TO IMPORT ?
// const Convert = require('location/lateModel.js'); 
// OR
// import Convert from 'location/lateModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOflateModel(data)
// FOR ARRAY
// const data = Convert.listOflateModel(data)
const modelOfDatalateModel = {
	id: '',
	branch_id: '',
	calc_base: '',
	total_custom: 0,
	created_at: '',
	created_by: '',
	updated_at: '',
	updated_by: '',
	deleted: false
};
function listOflateModel(data = []) {
  var listData = [modelOfDatalateModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				branch_id: val.branch_id ?? null,
				calc_base: val.calc_base ?? null,
				total_custom: val.total_custom ?? null,
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
function objectOflateModel(data = null) {
  var objectData = modelOfDatalateModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.branch_id = data.branch_id ?? null;
		objectData.calc_base = data.calc_base ?? null;
		objectData.total_custom = data.total_custom ?? null;
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
  listOflateModel: listOflateModel,
  objectOflateModel: objectOflateModel,
};




  