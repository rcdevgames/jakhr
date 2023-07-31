// // HOW TO IMPORT ?
// // const Convert = require('location/payrollModel.js'); 
// // OR
// // import Convert from 'location/payrollModel.js'
// // HOW TO USE?
// // FOR OBJECT
// // const data = Convert.objectOfpayrollModel(data)
// // FOR ARRAY
// // const data = Convert.listOfpayrollModel(data)


// const modelOfDatavalue_to_add = {
// 	total_add: 0,
// 	gaji_pokok: 0,
// 	total_attendance: 0,
// 	tunjangan_tetap: modelOfDatatunjangan_tetap,
// 	tunjangan_harian: modelOfDatatunjangan_harian,
// 	lembur: 0,
// 	insentive_bonus: modelOfDatainsentive_bonus,
// 	tunjangan_tidak_tetap: modelOfDatatunjangan_tidak_tetap
// };
// const modelOfDatavalue_to_reduce = {
// 	total_reduce: 0,
// 	pajak: 0,
// 	late_penalty: 0,
// 	kasbon: modelOfDatakasbon,
// 	asuransi: modelOfDataasuransi,
// 	fix_deduction: modelOfDatafix_deduction,
// 	not_fix_deduction: modelOfDatanot_fix_deduction
// };
// const modelOfDataother_informations = {
// 	bank_name: '',
// 	bank_account: ''
// };
// const modelOfDatatunjangan_tetap = {
// 	total: 0,
// 	details: [modelOfDatadetails]
// }
// const modelOfDatatunjangan_harian = {
// 	total: 0,
// 	details: [modelOfDatadetails]
// }
// const modelOfDatainsentive_bonus = {
// 	total: 0,
// 	details: [modelOfDatadetails]
// }
// const modelOfDataasuransi = {
// 	jht_by_employee: 0,
// 	kesehatan_by_employee: 0,
// 	jp_by_employee: 0,
// 	other_insurance_by_employee: 0,
// 	jht_by_company: 0,
// 	kesehatan_by_company: 0,
// 	jp_by_company: 0,
// 	jkm_by_company: 0,
// 	jkk_by_company: 0,
// 	other_insurance_by_company: 0
// }
// const modelOfDatafix_deduction = {
// 	total: 0,
// 	details: []
// }
// const modelOfDatadetails = {
// 	name: '',
// 	total_tax: 0,
// 	is_final_tax: false,
// 	amount: 0,
// 	amount_tax: 0
// };
// const modelOfDatadetails = {
// 	name: '',
// 	total_tax: 0,
// 	is_final_tax: false,
// 	amount: 0,
// 	amount_tax: 0
// };
// const modelOfDatadetails = {
// 	amount: 0,
// 	description: ''
// };
// const modelOfDatadetails = {
// 	amount: 0,
// 	description: ''
// };
// const modelOfDatapayrollModel = {
// 	id: '',
// 	employee_id: '',
// 	employee_name: '',
// 	final_salary: 0,
// 	value_to_add: modelOfDatavalue_to_add,
// 	value_to_reduce: modelOfDatavalue_to_reduce,
// 	other_informations: modelOfDataother_informations
// };
// function listOfpayrollModel(data = []) {
//   var listData = [modelOfDatapayrollModel];
//   listData = [];
//   try {
//     data.map((val) => {
//       var object = {
// 				id: val.id ?? null,
// 				employee_id: val.employee_id ?? null,
// 				employee_name: val.employee_name ?? null,
// 				final_salary: val.final_salary ?? null,
// 				value_to_add: objectOfvalue_to_add(val.value_to_add ?? null),
// 				value_to_reduce: objectOfvalue_to_reduce(val.value_to_reduce ?? null),
// 				other_informations: objectOfother_informations(val.other_informations ?? null)
//       };
//       listData.push(object);
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
//   return listData;
// }
// function objectOfpayrollModel(data = null) {
//   var objectData = modelOfDatapayrollModel;
//   if (data == null) {
//     return null;
//   }
//   try {
// 		objectData.id = data.id ?? null;
// 		objectData.employee_id = data.employee_id ?? null;
// 		objectData.employee_name = data.employee_name ?? null;
// 		objectData.final_salary = data.final_salary ?? null;
// 		objectData.value_to_add = objectOfvalue_to_add(data.value_to_add ?? null);
// 		objectData.value_to_reduce = objectOfvalue_to_reduce(data.value_to_reduce ?? null);
// 		objectData.other_informations = objectOfother_informations(data.other_informations ?? null);
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }
// module.exports = {
//   listOfpayrollModel: listOfpayrollModel,
//   objectOfpayrollModel: objectOfpayrollModel,
// };
// function objectOfvalue_to_add(data = null) {
//   var objectData = modelOfDatavalue_to_add;
//   if (data == null) {
//     return null;
//   }
//   try {
// 		objectData.total_add = data.total_add ?? null;
// 		objectData.gaji_pokok = data.gaji_pokok ?? null;
// 		objectData.total_attendance = data.total_attendance ?? null;
// 		objectData.tunjangan_tetap = objectOftunjangan_tetap(data.tunjangan_tetap ?? null);
// 		objectData.tunjangan_harian = objectOftunjangan_harian(data.tunjangan_harian ?? null);
// 		objectData.lembur = data.lembur ?? null;
// 		objectData.insentive_bonus = objectOfinsentive_bonus(data.insentive_bonus ?? null);
// 		objectData.tunjangan_tidak_tetap = objectOftunjangan_tidak_tetap(data.tunjangan_tidak_tetap ?? null);
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }
// function objectOfvalue_to_reduce(data = null) {
//   var objectData = modelOfDatavalue_to_reduce;
//   if (data == null) {
//     return null;
//   }
//   try {
// 		objectData.total_reduce = data.total_reduce ?? null;
// 		objectData.pajak = data.pajak ?? null;
// 		objectData.late_penalty = data.late_penalty ?? null;
// 		objectData.kasbon = objectOfkasbon(data.kasbon ?? null);
// 		objectData.asuransi = objectOfasuransi(data.asuransi ?? null);
// 		objectData.fix_deduction = objectOffix_deduction(data.fix_deduction ?? null);
// 		objectData.not_fix_deduction = objectOfnot_fix_deduction(data.not_fix_deduction ?? null);
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }
// function objectOfother_informations(data = null) {
//   var objectData = modelOfDataother_informations;
//   if (data == null) {
//     return null;
//   }
//   try {
// 		objectData.bank_name = data.bank_name ?? null;
// 		objectData.bank_account = data.bank_account ?? null;
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }

// function objectOftunjangan_tetap(data = null) {
//   var objectData = modelOfDatatunjangan_tetap;
//   if (data == null) {
//     return null;
//   };
//   try {
// 		objectData.total = data.total ?? null;
// 		objectData.details = listOfdetails(data.details ?? []);
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }
// function objectOftunjangan_harian(data = null) {
//   var objectData = modelOfDatatunjangan_harian;
//   if (data == null) {
//     return null;
//   };
//   try {
// 		objectData.total = data.total ?? null;
// 		objectData.details = listOfdetails(data.details ?? []);
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }
// function objectOfinsentive_bonus(data = null) {
//   var objectData = modelOfDatainsentive_bonus;
//   if (data == null) {
//     return null;
//   };
//   try {
// 		objectData.total = data.total ?? null;
// 		objectData.details = listOfdetails(data.details ?? []);
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }
// const modelOfDatatunjangan_tidak_tetap = {
// 	total: 0,
// 	details: [modelOfDatadetails]
// }
// function objectOftunjangan_tidak_tetap(data = null) {
//   var objectData = modelOfDatatunjangan_tidak_tetap;
//   if (data == null) {
//     return null;
//   };
//   try {
// 		objectData.total = data.total ?? null;
// 		objectData.details = listOfdetails(data.details ?? []);
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }
// const modelOfDatakasbon = {
// 	total: 0,
// 	details: []
// }
// function objectOfkasbon(data = null) {
//   var objectData = modelOfDatakasbon;
//   if (data == null) {
//     return null;
//   };
//   try {
// 		objectData.total = data.total ?? null;
// 		objectData.details = data.details ?? [];
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }
// function objectOfasuransi(data = null) {
//   var objectData = modelOfDataasuransi;
//   if (data == null) {
//     return null;
//   };
//   try {
// 		objectData.jht_by_employee = data.jht_by_employee ?? null;
// 		objectData.kesehatan_by_employee = data.kesehatan_by_employee ?? null;
// 		objectData.jp_by_employee = data.jp_by_employee ?? null;
// 		objectData.other_insurance_by_employee = data.other_insurance_by_employee ?? null;
// 		objectData.jht_by_company = data.jht_by_company ?? null;
// 		objectData.kesehatan_by_company = data.kesehatan_by_company ?? null;
// 		objectData.jp_by_company = data.jp_by_company ?? null;
// 		objectData.jkm_by_company = data.jkm_by_company ?? null;
// 		objectData.jkk_by_company = data.jkk_by_company ?? null;
// 		objectData.other_insurance_by_company = data.other_insurance_by_company ?? null;
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }
// function objectOffix_deduction(data = null) {
//   var objectData = modelOfDatafix_deduction;
//   if (data == null) {
//     return null;
//   };
//   try {
// 		objectData.total = data.total ?? null;
// 		objectData.details = data.details ?? [];
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }
// const modelOfDatanot_fix_deduction = {
// 	total: 0,
// 	details: [modelOfDatadetails]
// }
// function objectOfnot_fix_deduction(data = null) {
//   var objectData = modelOfDatanot_fix_deduction;
//   if (data == null) {
//     return null;
//   };
//   try {
// 		objectData.total = data.total ?? null;
// 		objectData.details = listOfdetails(data.details ?? []);
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }

// function listOfdetails(data = []) {
//   var listData = [modelOfDatadetails];
//   listData = [];
//   try {
//     data.map((val) => {
//       var object = {
// 				name: val.name ?? null,
// 				total_tax: val.total_tax ?? null,
// 				is_final_tax: val.is_final_tax ?? null,
// 				amount: val.amount ?? null,
// 				amount_tax: val.amount_tax ?? null
//       };
//       listData.push(object);
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
//   return listData;
// }
// function listOfdetails(data = []) {
//   var listData = [modelOfDatadetails];
//   listData = [];
//   try {
//     data.map((val) => {
//       var object = {
// 				name: val.name ?? null,
// 				total_tax: val.total_tax ?? null,
// 				is_final_tax: val.is_final_tax ?? null,
// 				amount: val.amount ?? null,
// 				amount_tax: val.amount_tax ?? null
//       };
//       listData.push(object);
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
//   return listData;
// }
// function listOfdetails(data = []) {
//   var listData = [modelOfDatadetails];
//   listData = [];
//   try {
//     data.map((val) => {
//       var object = {
// 				amount: val.amount ?? null,
// 				description: val.description ?? null
//       };
//       listData.push(object);
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
//   return listData;
// }
// function listOfdetails(data = []) {
//   var listData = [modelOfDatadetails];
//   listData = [];
//   try {
//     data.map((val) => {
//       var object = {
// 				amount: val.amount ?? null,
// 				description: val.description ?? null
//       };
//       listData.push(object);
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
//   return listData;
// }
// const modelOfDatadetails = {
// 	amount: 0,
// 	description: ''
// };
// function listOfdetails(data = []) {
//   var listData = [modelOfDatadetails];
//   listData = [];
//   try {
//     data.map((val) => {
//       var object = {
// 				amount: val.amount ?? null,
// 				description: val.description ?? null
//       };
//       listData.push(object);
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
//   return listData;
// }

  