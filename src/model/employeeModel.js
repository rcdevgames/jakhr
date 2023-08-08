// HOW TO IMPORT ?
// const Convert = require('location/employeeModel.js'); 
// OR
// import Convert from 'location/employeeModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfemployeeModel(data)
// FOR ARRAY
// const data = Convert.listOfemployeeModel(data)
const modelOfDatauser = {
	password: ''
};
const modelOfDatarole = {
	id: ''
};
const modelOfDataemployeeModel = {
	id: '',
	full_name: '',
	phone_number: '',
	email: '',
	gender: '',
	marital_status: '',
	religion: '',
	pob: '',
	dob: '',
	blood_type: '',
	id_type: '',
	id_number: '',
	citizen_address: '',
	residential_address: '',
	employee_id: '',
	employee_join_date: '',
	employee_expired_date: '',
	tax_type: 0,
	tax_number: '',
	branch_id: '',
	organization_id: '',
	job_level_id: '',
	job_position_id: '',
	employee_status_id: '',
	ptkp: '',
	create_user: false,
	emergency_contact_name: null,
	emergency_contact_relationship: null,
	emergency_contact_phone_number: null,
	is_payroll: false,
	attend_out_of_range:false,
    "photo":"",
	user: modelOfDatauser,
	role: modelOfDatarole
};
function listOfemployeeModel(data = []) {
  var listData = [modelOfDataemployeeModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				full_name: val.full_name ?? null,
				id: val.id ?? null,
				photo: val.photo ?? null,
				phone_number: val.phone_number ?? null,
				email: val.email ?? null,
				gender: val.gender ?? null,
				ptkp: val.ptkp ?? null,
				marital_status: val.marital_status ?? null,
				religion: val.religion ?? null,
				pob: val.pob ?? null,
				dob: val.dob ?? null,
				blood_type: val.blood_type ?? null,
				id_type: val.id_type ?? null,
				id_number: val.id_number ?? null,
				citizen_address: val.citizen_address ?? null,
				residential_address: val.residential_address ?? null,
				employee_id: val.employee_id ?? null,
				employee_join_date: val.employee_join_date ?? null,
				employee_expired_date: val.employee_expired_date ?? null,
				tax_type: val.tax_type ?? null,
				tax_number: val.tax_number ?? null,
				branch_id: val.branch_id ?? null,
				organization_id: val.organization_id ?? null,
				job_level_id: val.job_level_id ?? null,
				job_position_id: val.job_position_id ?? null,
				employee_status_id: val.employee_status_id ?? null,
				create_user: val.create_user ?? null,
				emergency_contact_name: val.emergency_contact_name ?? null,
				emergency_contact_relationship: val.emergency_contact_relationship ?? null,
				emergency_contact_phone_number: val.emergency_contact_phone_number ?? null,
				is_payroll: val.is_payroll ?? null,
				attend_out_of_range: val.attend_out_of_range ?? false,
				user: objectOfuser(val.user ?? null),
				role: objectOfrole(val.role ?? null)
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfemployeeModel(data = null) {
  var objectData = modelOfDataemployeeModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.full_name = data.full_name ?? null;
		objectData.id = data.id ?? null;
		objectData.photo = data.photo ?? null;
		objectData.phone_number = data.phone_number ?? null;
		objectData.email = data.email ?? null;
		objectData.gender = data.gender ?? null;
		objectData.ptkp = data.ptkp ?? null;
		objectData.marital_status = data.marital_status ?? null;
		objectData.religion = data.religion ?? null;
		objectData.pob = data.pob ?? null;
		objectData.dob = data.dob ?? null;
		objectData.blood_type = data.blood_type ?? null;
		objectData.id_type = data.id_type ?? null;
		objectData.id_number = data.id_number ?? null;
		objectData.citizen_address = data.citizen_address ?? null;
		objectData.residential_address = data.residential_address ?? null;
		objectData.employee_id = data.employee_id ?? null;
		objectData.employee_join_date = data.employee_join_date ?? null;
		objectData.employee_expired_date = data.employee_expired_date ?? null;
		objectData.tax_type = data.tax_type ?? null;
		objectData.tax_number = data.tax_number ?? null;
		objectData.branch_id = data.branch_id ?? null;
		objectData.organization_id = data.organization_id ?? null;
		objectData.job_level_id = data.job_level_id ?? null;
		objectData.job_position_id = data.job_position_id ?? null;
		objectData.employee_status_id = data.employee_status_id ?? null;
		objectData.create_user = data.create_user ?? null;
		objectData.emergency_contact_name = data.emergency_contact_name ?? null;
		objectData.emergency_contact_relationship = data.emergency_contact_relationship ?? null;
		objectData.emergency_contact_phone_number = data.emergency_contact_phone_number ?? null;
		objectData.is_payroll = data.is_payroll ?? null;
		objectData.attend_out_of_range = data.attend_out_of_range ?? false;
		objectData.user = objectOfuser(data.user ?? null);
		objectData.role = objectOfrole(data.role ?? null);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfemployeeModel: listOfemployeeModel,
  objectOfemployeeModel: objectOfemployeeModel,
};

function objectOfuser(data = null) {
  var objectData = modelOfDatauser;
  if (data == null) {
    return null;
  }
  try {
		objectData.password = data.password ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}

function objectOfrole(data = null) {
	var objectData = modelOfDatarole;
	if (data == null) {
	  return null;
	}
	try {
		  objectData.id = data.id ?? null;
	} catch (error) {
	  console.log(error.message);
	}
	return objectData;
  }



  