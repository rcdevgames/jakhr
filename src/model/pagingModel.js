// HOW TO IMPORT ?
// const Convert = require('location/pagingModel.js'); 
// OR
// import Convert from 'location/pagingModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfpagingModel(data)
// FOR ARRAY
// const data = Convert.listOfpagingModel(data)
const modelOfDatapagingModel = {
	data: [],
	totalData: 0,
	totalPages: 0,
	currentPage: 0
};
function listOfpagingModel(data = []) {
  var listData = [modelOfDatapagingModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				data: val.data ?? [],
				totalData: val.totalData ?? null,
				totalPages: val.totalPages ?? null,
				currentPage: val.currentPage ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfpagingModel(data = null) {
  var objectData = modelOfDatapagingModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.data = data.data ?? [];
		objectData.totalData = data.totalData ?? null;
		objectData.totalPages = data.totalPages ?? null;
		objectData.currentPage = data.currentPage ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfpagingModel: listOfpagingModel,
  objectOfpagingModel: objectOfpagingModel,
};




  