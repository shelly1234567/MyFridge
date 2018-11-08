
var mongoose = require('mongoose');
var foodPath = mongoose.model('Food');

/* POST a new Food */ /* /api/food */
module.exports.foodCreate = function (req, res) {
  console.log(req.body);
  foodPath.create({
    name: req.body.name,
    date: req.body.date,
    expiry: req.body.expiry,
    left_overs: req.body.left_overs,
    quantity: req.body.quantity
  }, function(err, food) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err); 
    } else {
      /*res.header(
      Food:req.protocol + '://' + req.get('host') + '/api/food/' + food._id
      );*/
      console.log(food);
      sendJSONresponse(res, 201, food);
    }
  }); 
};

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};
  
  
  /* GET a food List */	
module.exports.foodDetail = function (req, res) {
  
  if (!req.params.foodid) {
    sendJSONresponse(res, 404, {
      "message": "Not Food item exists."
    });
    return;
  }
  foodpath
    .find({})
    .exec(
      
          function(err, food) {
            if (!food){
              sendJSONresponse(res, 404, {
                "message": "Food items don't exists"
              });
              return;
            } else {
              sendJSONresponse(res, 200, food);
            }
          }
    );
  
	sendJsonResponse(res, 200, {"status" : "success in foodDetail"});
	};

	
/* GET a food by the foodid */	

module.exports.foodReadOne = function (req, res) {
	console.log('Finding Food details', req.params);
	if (req.params && req.params.foodid) {
		foodPath
			.findById(req.params.foodid)
			.exec(function(err, food) {
				if (!food) {
					sendJsonResponse(res, 404, {
						"message": "Food ID not found"
						
					});
				}
				else if (err) {
					console.log(err);
					sendJSONresponse(res, 404, err);
					return;
				}
				console.log(food);
				sendJSONresponse(res, 200, food);
			});
		
		
	}
	else{
		console.log('No foodid specified');
		sendJSONresponse(res, 404, {
			"message": "No Food ID in request"
		});
	}
};

/* PUT /api/food/:foodid */
module.exports.foodUpdateOne = function (req, res) {
  if (!req.params.foodid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, foodid is required"
    });
    return;
  }
  foodPath
    .findById(req.params.foodid)
    .select()
    .exec(
      function(err, food) {
        if (!food) {
          sendJSONresponse(res, 404, {
            "message": "foodid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        
        food.name = req.body.name;
        food.date = req.body.date;
        food.expiry = req.body.expiry;
        food.left_overs = req.body.left_overs;
        food.quantity = req.body.quantity;
        food.save(function(err, food) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, food);
          } 
        });
      }
    );
};


/* DELETE /api/food/:foodid */
module.exports.foodDeleteOne = function (req, res) {
	var foodid = req.params.foodid;
	if (foodid) {
		foodPath
			.findByIdAndRemove(foodid)
			.exec(
				function(err, food) {
					if (err) {
						console.log(err);
						sendJsonResponse(res, 404, err);
						return;
					}
					console.log("Food ID" + foodid + "deleted");
					sendJsonResponse(res, 204, null);
				}
			);
	} 
	else {
		sendJsonResponse(res, 404, {
			"message": "No FoodID exists"
		});
	}
};


