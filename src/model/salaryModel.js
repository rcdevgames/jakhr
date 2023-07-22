// HOW TO IMPORT ?
// const Convert = require('location/salaryModel.js'); 
// OR
// import Convert from 'location/salaryModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfsalaryModel(data)
// FOR ARRAY
// const data = Convert.listOfsalaryModel(data)

const modelOfDataemployee = {
	full_name: ''
};
const modelOfDatasalaryModel = {
	id: '',
	employee_id: '',
	basic_salary: '',
	overtime_config: '',
	overtime: '',
	late_deduction_config: '',
	late_deduction: '',
	working_days: '',
	leave_balance_incentive: '',
	jht: '',
	kesehatan: '',
	jp: '',
	other_insurance: '',
	jht_company: 0,
	kesehatan_company: 0,
	jp_company: 0,
	jkm_company: 0,
	jkk_company: 0,
	other_insurance_company: 0,
	bank_name: '',
	bank_account: '',
	created_at: '',
	created_by: '',
	updated_at: '',
	updated_by: '',
	deleted: false,
	employee: modelOfDataemployee
};
function listOfsalaryModel(data = []) {
  var listData = [modelOfDatasalaryModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				employee_id: val.employee_id ?? null,
				basic_salary: val.basic_salary ?? null,
				overtime_config: val.overtime_config ?? null,
				overtime: val.overtime ?? null,
				late_deduction_config: val.late_deduction_config ?? null,
				late_deduction: val.late_deduction ?? null,
				working_days: val.working_days ?? null,
				leave_balance_incentive: val.leave_balance_incentive ?? null,
				jht: val.jht ?? null,
				kesehatan: val.kesehatan ?? null,
				jp: val.jp ?? null,
				other_insurance: val.other_insurance ?? null,
				jht_company: val.jht_company ?? null,
				kesehatan_company: val.kesehatan_company ?? null,
				jp_company: val.jp_company ?? null,
				jkm_company: val.jkm_company ?? null,
				jkk_company: val.jkk_company ?? null,
				other_insurance_company: val.other_insurance_company ?? null,
				bank_name: val.bank_name ?? null,
				bank_account: val.bank_account ?? null,
				created_at: val.created_at ?? null,
				created_by: val.created_by ?? null,
				updated_at: val.updated_at ?? null,
				updated_by: val.updated_by ?? null,
				deleted: val.deleted ?? null,
				employee: objectOfemployee(val.employee ?? null)
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfsalaryModel(data = null) {
  var objectData = modelOfDatasalaryModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.employee_id = data.employee_id ?? null;
		objectData.basic_salary = data.basic_salary ?? null;
		objectData.overtime_config = data.overtime_config ?? null;
		objectData.overtime = data.overtime ?? null;
		objectData.late_deduction_config = data.late_deduction_config ?? null;
		objectData.late_deduction = data.late_deduction ?? null;
		objectData.working_days = data.working_days ?? null;
		objectData.leave_balance_incentive = data.leave_balance_incentive ?? null;
		objectData.jht = data.jht ?? null;
		objectData.kesehatan = data.kesehatan ?? null;
		objectData.jp = data.jp ?? null;
		objectData.other_insurance = data.other_insurance ?? null;
		objectData.jht_company = data.jht_company ?? null;
		objectData.kesehatan_company = data.kesehatan_company ?? null;
		objectData.jp_company = data.jp_company ?? null;
		objectData.jkm_company = data.jkm_company ?? null;
		objectData.jkk_company = data.jkk_company ?? null;
		objectData.other_insurance_company = data.other_insurance_company ?? null;
		objectData.bank_name = data.bank_name ?? null;
		objectData.bank_account = data.bank_account ?? null;
		objectData.created_at = data.created_at ?? null;
		objectData.created_by = data.created_by ?? null;
		objectData.updated_at = data.updated_at ?? null;
		objectData.updated_by = data.updated_by ?? null;
		objectData.deleted = data.deleted ?? null;
		objectData.employee = objectOfemployee(data.employee ?? null);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfsalaryModel: listOfsalaryModel,
  objectOfsalaryModel: objectOfsalaryModel,
};

function objectOfemployee(data = null) {
  var objectData = modelOfDataemployee;
  if (data == null) {
    return null;
  }
  try {
		objectData.full_name = data.full_name ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}



  