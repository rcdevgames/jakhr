// HOW TO IMPORT ?
// const Convert = require('location/leave_massModel.js'); 
// OR
// import Convert from 'location/leave_massModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfleave_massModel(data)
// FOR ARRAY
// const data = Convert.listOfleave_massModel(data)
const modelOfDataleave_massModel = {
	id: '',
	company_id: '',
	leave_date: '',
	leave_name: '',
	created_at: '',
	created_by: '',
	updated_at: '',
	updated_by: '',
	deleted: false
};
function listOfleave_massModel(data = []) {
  var listData = [modelOfDataleave_massModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				company_id: val.company_id ?? null,
				leave_date: val.leave_date ?? null,
				leave_name: val.leave_name ?? null,
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
function objectOfleave_massModel(data = null) {
  var objectData = modelOfDataleave_massModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.company_id = data.company_id ?? null;
		objectData.leave_date = data.leave_date ?? null;
		objectData.leave_name = data.leave_name ?? null;
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
  listOfleave_massModel: listOfleave_massModel,
  objectOfleave_massModel: objectOfleave_massModel,
};




  