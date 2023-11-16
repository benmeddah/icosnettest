const model = require("../model");

module.exports = {
	update: async (req, rep,next) => {
		try {
            if(!req.body.status)
            throw new Error("invalid request"); 
            var x = false;
            if(req.body.title == undefined && req.body.price == undefined && req.body.description == undefined)
            x = await model.cancelOrder(req.params.id);
            else
            x = await model.updateOrder(req.params.id,req.body);
            
            if(x) rep.send({msg:'Order updated'})
            else throw new Error("error db")
        } catch (error) {
            console.log(error);
            rep.status(404).send({msg:false,err:error.message})
        }
	}
};
