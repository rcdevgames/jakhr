// HOW TO IMPORT ?
// const Convert = require('location/leave_ballanceModel.js'); 
// OR
// import Convert from 'location/leave_ballanceModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfleave_ballanceModel(data)
// FOR ARRAY
// const data = Convert.listOfleave_ballanceModel(data)

const modelOfDataleave_type = {
	name: ''
};

const modelOfDataemployee = {
	full_name: '',
	employee_id: ''
};
const modelOfDataleave_ballanceModel = {
	id: '',
	leave_type_id: '',
	employee_id: '',
	periode: 0,
	balance: 0,
	leave_rest: 0,
	created_at: '',
	updated_at: '',
	created_by: '',
	updated_by: '',
	deleted: false,
	employee: modelOfDataemployee,
	leave_type: modelOfDataleave_type
};
function listOfleave_ballanceModel(data = []) {
  var listData = [modelOfDataleave_ballanceModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				leave_type_id: val.leave_type_id ?? null,
				employee_id: val.employee_id ?? null,
				periode: val.periode ?? null,
				balance: val.balance ?? null,
				leave_rest: val.leave_rest ?? null,
				created_at: val.created_at ?? null,
				updated_at: val.updated_at ?? null,
				created_by: val.created_by ?? null,
				updated_by: val.updated_by ?? null,
				deleted: val.deleted ?? null,
				employee: objectOfemployee(val.employee ?? null),
				leave_type: objectOfleave_type(val.leave_type ?? null)
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfleave_ballanceModel(data = null) {
  var objectData = modelOfDataleave_ballanceModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.leave_type_id = data.leave_type_id ?? null;
		objectData.employee_id = data.employee_id ?? null;
		objectData.periode = data.periode ?? null;
		objectData.balance = data.balance ?? null;
		objectData.leave_rest = data.leave_rest ?? null;
		objectData.created_at = data.created_at ?? null;
		objectData.updated_at = data.updated_at ?? null;
		objectData.created_by = data.created_by ?? null;
		objectData.updated_by = data.updated_by ?? null;
		objectData.deleted = data.deleted ?? null;
		objectData.employee = objectOfemployee(data.employee ?? null);
		objectData.leave_type = objectOfleave_type(data.leave_type ?? null);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfleave_ballanceModel: listOfleave_ballanceModel,
  objectOfleave_ballanceModel: objectOfleave_ballanceModel,
};
function objectOfemployee(data = null) {
  var objectData = modelOfDataemployee;
  if (data == null) {
    return null;
  }
  try {
		objectData.full_name = data.full_name ?? null;
		objectData.employee_id = data.employee_id ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
function objectOfleave_type(data = null) {
  var objectData = modelOfDataleave_type;
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



  