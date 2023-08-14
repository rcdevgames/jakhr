// HOW TO IMPORT ?
// const Convert = require('location/attendance_detailModel.js'); 
// OR
// import Convert from 'location/attendance_detailModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfattendance_detailModel(data)
// FOR ARRAY
// const data = Convert.listOfattendance_detailModel(data)

const modelOfDataemployee = {
	full_name: '',
	id: '',
	employee_id: ''
}
const modelOfDataattendance_images = {
	in: '',
	out: ''
};

const modelOfDatadata = {
	id: '',
	employee_id: '',
	date_in: '',
	date_out: '',
	time_in: '',
	time_out: '',
	type: '',
	description: '',
	lat: 0,
	lng: 0,
	approved_by: null,
	validated_by: null,
	created_at: '',
	updated_at: '',
	created_by: '',
	updated_by: '',
	deleted: false,
	employee: modelOfDataemployee
};
const modelOfDataattendance_detailModel = {
	data: modelOfDatadata,
	attendance_images: modelOfDataattendance_images
};
function listOfattendance_detailModel(data = []) {
  var listData = [modelOfDataattendance_detailModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				data: objectOfdata(val.data ?? null),
				attendance_images: objectOfattendance_images(val.attendance_images ?? null)
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfattendance_detailModel(data = null) {
  var objectData = modelOfDataattendance_detailModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.data = objectOfdata(data.data ?? null);
		objectData.attendance_images = objectOfattendance_images(data.attendance_images ?? null);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfattendance_detailModel: listOfattendance_detailModel,
  objectOfattendance_detailModel: objectOfattendance_detailModel,
};

function objectOfdata(data = null) {
  var objectData = modelOfDatadata;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.employee_id = data.employee_id ?? null;
		objectData.date_in = data.date_in ?? null;
		objectData.date_out = data.date_out ?? null;
		objectData.time_in = data.time_in ?? null;
		objectData.time_out = data.time_out ?? null;
		objectData.type = data.type ?? null;
		objectData.description = data.description ?? null;
		objectData.lat = data.lat ?? null;
		objectData.lng = data.lng ?? null;
		objectData.approved_by = data.approved_by ?? null;
		objectData.validated_by = data.validated_by ?? null;
		objectData.created_at = data.created_at ?? null;
		objectData.updated_at = data.updated_at ?? null;
		objectData.created_by = data.created_by ?? null;
		objectData.updated_by = data.updated_by ?? null;
		objectData.deleted = data.deleted ?? null;
		objectData.employee = objectOfemployee(data.employee ?? null);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
function objectOfattendance_images(data = null) {
  var objectData = modelOfDataattendance_images;
  if (data == null) {
    return null;
  }
  try {
		objectData.in = data.in ?? null;
		objectData.out = data.out ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}

function objectOfemployee(data = null) {
  var objectData = modelOfDataemployee;
  if (data == null) {
    return null;
  };
  try {
		objectData.full_name = data.full_name ?? null;
		objectData.id = data.id ?? null;
		objectData.employee_id = data.employee_id ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}


  