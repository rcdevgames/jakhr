// HOW TO IMPORT ?
// const Convert = require('location/branchModel.js');
// OR
// import Convert from 'location/branchModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfbranchModel(data)
// FOR ARRAY
// const data = Convert.listOfbranchModel(data)
// const modelOfDatacompany = {
// 	company_id: '',
// 	company_name: ''
// };
// function objectOfcompany(data = null) {
//   var objectData = modelOfDatacompany;
//   if (data == null) {
//     return null;
//   }
//   try {
// 		objectData.company_id = data.company_id ?? null;
// 		objectData.company_name = data.company_name ?? null;
//   } catch (error) {
//     console.log(error.message);
//   }
//   return objectData;
// }

const modelOfDatabranchModel = {
//   id: "",
  name: "",
  address: "",
  radius: 0,
//   latitude: 0,
//   longitude: 0,
  primary_phone: "",
  secondary_phone: "",
//   sch_in: "",
//   sch_out: "",
//   sch_in_half: null,
//   sch_out_half: null,
  // company: modelOfDatacompany,
  created_at: "",
//   updated_at: "",
//   created_by: "",
//   updated_by: "",
};
function listOfbranchModel(data = []) {
  var listData = [modelOfDatabranchModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
        // id: val.id ?? null,
        name: val.name ?? null,
        address: val.address ?? null,
        radius: val.radius ?? null,
        // latitude: val.latitude ?? null,
        // longitude: val.longitude ?? null,
        primary_phone: val.primary_phone ?? null,
        secondary_phone: val.secondary_phone ?? null,
        // sch_in: val.sch_in ?? null,
        // sch_out: val.sch_out ?? null,
        // sch_in_half: val.sch_in_half ?? null,
        // sch_out_half: val.sch_out_half ?? null,
        // company: objectOfcompany(val.company ?? null),
        created_at: val.created_at ?? null,
        // updated_at: val.updated_at ?? null,
        // created_by: val.created_by ?? null,
        // updated_by: val.updated_by ?? null,
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfbranchModel(data = null) {
  var objectData = modelOfDatabranchModel;
  if (data == null) {
    return null;
  }
  try {
    // objectData.id = data.id ?? null;
    objectData.name = data.name ?? null;
    objectData.address = data.address ?? null;
    objectData.radius = data.radius ?? null;
    // objectData.latitude = data.latitude ?? null;
    // objectData.longitude = data.longitude ?? null;
    objectData.primary_phone = data.primary_phone ?? null;
    objectData.secondary_phone = data.secondary_phone ?? null;
    // objectData.sch_in = data.sch_in ?? null;
    // objectData.sch_out = data.sch_out ?? null;
    // objectData.sch_in_half = data.sch_in_half ?? null;
    // objectData.sch_out_half = data.sch_out_half ?? null;
    // objectData.company = objectOfcompany(data.company ?? null);
    objectData.created_at = data.created_at ?? null;
    // objectData.updated_at = data.updated_at ?? null;
    // objectData.created_by = data.created_by ?? null;
    // objectData.updated_by = data.updated_by ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfbranchModel: listOfbranchModel,
  objectOfbranchModel: objectOfbranchModel,
};
