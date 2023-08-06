// HOW TO IMPORT ?
// const Convert = require('location/role_menuModel.js'); 
// OR
// import Convert from 'location/role_menuModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfrole_menuModel(data)
// FOR ARRAY
// const data = Convert.listOfrole_menuModel(data)

const modelOfDatachildren = {
	id: '',
	parent_id: '',
	title: '',
	route: '',
	description: '',
	children: []
};
const modelOfDatarole_menuModel = {
	id: '',
	parent_id: null,
	title: '',
	route: '',
	description: '',
	children: [modelOfDatachildren]
};
function listOfrole_menuModel(data = []) {
  var listData = [modelOfDatarole_menuModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				parent_id: val.parent_id ?? null,
				title: val.title ?? null,
				route: val.route ?? null,
				description: val.description ?? null,
				children: listOfchildren(val.children ?? [])
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfrole_menuModel(data = null) {
  var objectData = modelOfDatarole_menuModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id = data.id ?? null;
		objectData.parent_id = data.parent_id ?? null;
		objectData.title = data.title ?? null;
		objectData.route = data.route ?? null;
		objectData.description = data.description ?? null;
		objectData.children = listOfchildren(data.children ?? []);
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfrole_menuModel: listOfrole_menuModel,
  objectOfrole_menuModel: objectOfrole_menuModel,
};

function listOfchildren(data = []) {
  var listData = [modelOfDatachildren];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id: val.id ?? null,
				parent_id: val.parent_id ?? null,
				title: val.title ?? null,
				route: val.route ?? null,
				description: val.description ?? null,
				children: val.children ?? []
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}



  