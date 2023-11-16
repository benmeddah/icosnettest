const model = require("../model");

module.exports = {
	deleteO: async (req, rep,next) => {
		try {
            // is authentified ?
            const x = await model.deleteOrder(req.params.id);
            
            if(x) rep.send({msg:'Order deleted'})
            else throw new Error("error db")
        } catch (error) {
            console.log(error);
            rep.status(404).send({msg:false,err:error.message})
        }
	}
};
