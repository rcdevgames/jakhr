// HOW TO IMPORT ?
// const Convert = require('location/deductionModel.js'); 
// OR
// import Convert from 'location/deductionModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfdeductionModel(data)
// FOR ARRAY
// const data = Convert.listOfdeductionModel(data)
const modelOfDataemployee = {
	id: '',
	name: ''
};
const modelOfDatacomponent_name = {
	id: '',
	name: ''
};
const modelOfDatadeductionModel = {
	id: '',
	amount: 0,
	description: '',
	employee: modelOfDataemployee,
	component_name: modelOfDatacomponent_name
};
function listOfdeductionModel(data = []) {
  var listData = [modelOfDatadeductionModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				amount: val.amount ?? null,
				description: val.description ?? null,
				employee: objectOfemployee(val.employee ?? null),
				component_name: objectOfcomponent_name(val.component_name ?? null)
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfdeductionModel(data = null) {
  var objectData = modelOfDatadeductionModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.amount = data.amount ?? null;
		objectData.description = data.description ?? null;
		objectData.employee = objectOfemployee(data.employee ?? null);
		objectData.component_name = objectOfcomponent_name(data.component_name ?? null);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfdeductionModel: listOfdeductionModel,
  objectOfdeductionModel: objectOfdeductionModel,
};

function objectOfemployee(data = null) {
  var objectData = modelOfDataemployee;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.name = data.name ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
function objectOfcomponent_name(data = null) {
  var objectData = modelOfDatacomponent_name;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.name = data.name ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}



  