var Sequelize=require('sequelize');

var env=process.env.NODE_ENV || 'development';

var sequelize;

if(env === 'production'){
	sequelize=new Sequelize(process.env.DATABASE_URL,{
    'dialect':'postgres'
	});
	else{
		var sequelize=new Sequelize(undefined,undefined,undefined,{
	'dialect':'sqlite',
	'storage':__dirname+'/data/ITextile_Solution.sqlite'
});
	}
}




var db={};

db.itemCategory=sequelize.import(__dirname+'/models/itemCategory.js');
db.sequelize=sequelize;
db.Sequelize=Sequelize;

module.exports=db;