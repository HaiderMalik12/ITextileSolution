var Sequelize =require('sequelize');
var sequelize=new Sequelize(undefined,undefined,undefined,{
	'dialect':'sqlite',
	'storage':__dirname+'/data/ITextile_Solution.sqlite'
});

//define a model

var itemCategory=sequelize.define('itemcategory',{
  name:{
  	type:Sequelize.STRING,
  	allowNull:false,
  	len:[1,250]
  }
});


sequelize.sync().then(function(){
 console.log('Everything is synced !!');
  var yarn={
   name:'yarn'
  };
   
  itemCategory.create(yarn).then(function(itemCategory){
   console.log('ItemCategory is Saved to Db Sucessfully'+ itemCategory.toJSON());
   
  },function(err){
   console.log('Unable to save the Itemcategory'+err);
  });

 

},function(err){
 console.log('Unable to connect with db'+err);
});