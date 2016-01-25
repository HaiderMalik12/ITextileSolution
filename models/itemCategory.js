module.exports=function(sequelize,DataTypes){
	return sequelize.define('itemCategory',{
		name:{
  	type:DataTypes.STRING,
  	allowNull:false,
  	len:[1,250]
  }
});

};