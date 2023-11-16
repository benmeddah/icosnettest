const model = require("../model");

module.exports = {
	update: async (req, rep,next) => {
		try {
            // is authentified ?
            const x = await model.updateOrder(req.params.id,req.body);
            
            if(x) rep.send({msg:'Order updated'})
            else throw new Error("error db")
        } catch (error) {
            console.log(error);
            rep.status(404).send({msg:false,err:error.message})
        }
	}
};
