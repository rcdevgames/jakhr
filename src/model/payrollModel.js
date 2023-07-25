// HOW TO IMPORT ?
// const Convert = require('location/payrollModel.js'); 
// OR
// import Convert from 'location/payrollModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfpayrollModel(data)
// FOR ARRAY
// const data = Convert.listOfpayrollModel(data)
const modelOfDatavalue_to_add = {
	gaji_pokok: 0,
	tunjangan_tetap: 0,
	tunjangan_harian: 0,
	lembur: 0,
	insentive_bonus: 0,
	tunjangan_tidak_tetap: 0
};
const modelOfDatavalue_to_reduce = {
	pajak: 0,
	late_penalty: 0,
	kasbon: 0,
	asuransi: modelOfDataasuransi,
	fix_deduction: 0,
	not_fix_deduction: 0
};
const modelOfDataother_informations = {
	bank_name: '',
	bank_account: ''
};
const modelOfDataasuransi = {
	jht: 0,
	kesehatan: 0,
	jp: 0,
	other_insurance: 0
}
const modelOfDatapayrollModel = {
	id: '',
	employee_id: '',
	employee_name: '',
	final_salary: 0,
	value_to_add: modelOfDatavalue_to_add,
	value_to_reduce: modelOfDatavalue_to_reduce,
	other_informations: modelOfDataother_informations
};
function listOfpayrollModel(data = []) {
  var listData = [modelOfDatapayrollModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				employee_id: val.employee_id ?? null,
				employee_name: val.employee_name ?? null,
				final_salary: val.final_salary ?? null,
				value_to_add: objectOfvalue_to_add(val.value_to_add ?? null),
				value_to_reduce: objectOfvalue_to_reduce(val.value_to_reduce ?? null),
				other_informations: objectOfother_informations(val.other_informations ?? null)
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfpayrollModel(data = null) {
  var objectData = modelOfDatapayrollModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.employee_id = data.employee_id ?? null;
		objectData.employee_name = data.employee_name ?? null;
		objectData.final_salary = data.final_salary ?? null;
		objectData.value_to_add = objectOfvalue_to_add(data.value_to_add ?? null);
		objectData.value_to_reduce = objectOfvalue_to_reduce(data.value_to_reduce ?? null);
		objectData.other_informations = objectOfother_informations(data.other_informations ?? null);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfpayrollModel: listOfpayrollModel,
  objectOfpayrollModel: objectOfpayrollModel,
};

function objectOfvalue_to_add(data = null) {
  var objectData = modelOfDatavalue_to_add;
  if (data == null) {
    return null;
  }
  try {
		objectData.gaji_pokok = data.gaji_pokok ?? null;
		objectData.tunjangan_tetap = data.tunjangan_tetap ?? null;
		objectData.tunjangan_harian = data.tunjangan_harian ?? null;
		objectData.lembur = data.lembur ?? null;
		objectData.insentive_bonus = data.insentive_bonus ?? null;
		objectData.tunjangan_tidak_tetap = data.tunjangan_tidak_tetap ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
function objectOfvalue_to_reduce(data = null) {
  var objectData = modelOfDatavalue_to_reduce;
  if (data == null) {
    return null;
  }
  try {
		objectData.pajak = data.pajak ?? null;
		objectData.late_penalty = data.late_penalty ?? null;
		objectData.kasbon = data.kasbon ?? null;
		objectData.asuransi = objectOfasuransi(data.asuransi ?? null);
		objectData.fix_deduction = data.fix_deduction ?? null;
		objectData.not_fix_deduction = data.not_fix_deduction ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
function objectOfother_informations(data = null) {
  var objectData = modelOfDataother_informations;
  if (data == null) {
    return null;
  }
  try {
		objectData.bank_name = data.bank_name ?? null;
		objectData.bank_account = data.bank_account ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}

function objectOfasuransi(data = null) {
  var objectData = modelOfDataasuransi;
  if (data == null) {
    return null;
  };
  try {
		objectData.jht = data.jht ?? null;
		objectData.kesehatan = data.kesehatan ?? null;
		objectData.jp = data.jp ?? null;
		objectData.other_insurance = data.other_insurance ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}


  