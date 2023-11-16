const model = require("../model");

module.exports = {
	create: async (req, rep,next) => {
		try {
            if(!req.session.username)
            throw new Error("Not Allowed");
            req.session.user_id = 19;
            console.log(req.body);
            if(!req.body.orderName)
                throw new Error("invalid order")
             
            const x = await model.createOrder(req.body,req.session.username);
            if(x) rep.send({msg:'Order added'})
            else throw new Error("error db")
        } catch (error) {
            console.log(error);
            rep.status(404).send({msg:false,err:error.message})
        }
	}
};
