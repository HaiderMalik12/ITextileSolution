var express=require('express');
var PORT=process.env.PORT || 3000;
var _=require('underscore');
var app=express();
var db=require('./db.js');
var bodyParser=require('body-parser');

//use middleware for post and Put
app.use(bodyParser.json());

app.get('/',function(req,res){
 res.send('Hello Express');

});


//POST /itemCategories
app.post('/itemCategories',function(req,res){
  
  var body=_.pick(req.body,'name');
  db.itemCategory.create(body).then(function(itemCategory){
    res.json(itemCategory);

  },function(err){
   res.status(400).json(err);
  });

});

//GET/itemCategories/?q=


app.get('/itemCategories',function(req,res){
 var query=req.query;
 var where={};
 if(query.hasOwnProperty('q') && query.q.length > 0){
 	where.name={
 		$like:'%'+query.q +'%'
 	};
 }
 db.itemCategory.findAll({where:where}).then(function(itemCategories){
 	res.json(itemCategories);
 },function(err){
  res.status(500).json(err);
 });
 
});

//GET/itemCategories/:id

app.get('/itemCategories/:id',function(req,res){
 var itemCategoryId=parseInt(req.params.id);

 if(_.isNumber(itemCategoryId)){
 	 db.itemCategory.findById(itemCategoryId).then(function(itemCategory){
   if(!!itemCategory)
   {
  res.json(itemCategory);
  }
  else{
  	res.status(404).json({
  		error:'No ItemCategory found'
  	})
  }
  },function(err){
  res.satus(500).send();
  });  
 }
});


//DELETE/itemCategories/:id

app.delete('/itemCategories/:id',function(req,res){
 
 var itemCategoryId=parseInt(req.params.id);
 db.itemCategory.destroy({
 	where:{
 		id:itemCategoryId
 	}
 }).then(function(rowsDeleted){
   if(rowsDeleted === 0){
   	res.status(404).json({
   		error:'no ItemCategory found with Id'
   	});
   }else{
   	//everything ok no return
   	res.status(204).json();
   }
 },function(err){
 res.status(500).send();
 });

});

//PUT/itemCategories/:id
app.put('/itemCategories/:id',function(req,res){
 var validateAttributes={};
 var itemCategoryId=parseInt(req.params.id,10);
 var body=_.pick(req.body,'name');
 if(body.hasOwnProperty('name')){
 	validateAttributes.name=body.name;
 }

 db.itemCategory.findById(itemCategoryId).then(function(itemCategory){
    if(itemCategory){
    	itemCategory.update(validateAttributes).then(function(itemCategory){
          res.json(itemCategory);
    	},function(err){
           res.status(404).json(err);
    	});
    }else{
    	res.status(400).send();
    }

 },function(err){
  res.status(500).send();
 });

});

//connect with Databse
db.sequelize.sync().then(function(){

app.listen(3000);
console.log('Express is Lisetning on PORT: '+PORT);
},function(err){
	console.log('Unable to connect with db'+err);
});
