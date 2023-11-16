const model = require("../model");

module.exports = {
	readAll: async (req, rep,next) => {
		try {
            // is authentified ?
            req.session.user_id = 19;
            const x = await model.readOrder();
            if(x) rep.send({orders:x})
            else throw new Error("error db")
        } catch (error) {
            console.log(error);
            rep.status(404).send({msg:false,err:error.message})
        }
	},
    readOne: async (req, rep,next) => {
		try {
            // is authentified ?
            const x = await model.readOrder(req.params.id);
            if(x) rep.send({order:x})
            else throw new Error("error db")
        } catch (error) {
            console.log(error);
            rep.status(404).send({msg:false,err:error.message})
        }
	},
};
