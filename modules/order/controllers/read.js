const model = require("../model");

module.exports = {
	read: async (req, rep,next) => {
		try {
            // is authentified ?
            req.session.user_id = 19;
            const x = await model.readOrders();
            if(x) rep.send({orders:x})
            else throw new Error("error db")
        } catch (error) {
            console.log(error);
            rep.status(404).send({msg:false,err:error.message})
        }
	}
};
