// HOW TO IMPORT ?
// const Convert = require('location/trans_overtimeModel.js'); 
// OR
// import Convert from 'location/trans_overtimeModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOftrans_overtimeModel(data)
// FOR ARRAY
// const data = Convert.listOftrans_overtimeModel(data)
const modelOfDatatrans_overtimeModel = {
	attendance_id: '',
	employee_id: '',
	reason: ''
};
function listOftrans_overtimeModel(data = []) {
  var listData = [modelOfDatatrans_overtimeModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				attendance_id: val.attendance_id ?? null,
				employee_id: val.employee_id ?? null,
				reason: val.reason ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOftrans_overtimeModel(data = null) {
  var objectData = modelOfDatatrans_overtimeModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.attendance_id = data.attendance_id ?? null;
		objectData.employee_id = data.employee_id ?? null;
		objectData.reason = data.reason ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOftrans_overtimeModel: listOftrans_overtimeModel,
  objectOftrans_overtimeModel: objectOftrans_overtimeModel,
};




  