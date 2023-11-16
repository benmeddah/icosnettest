const model = require("../model");

module.exports = {
	login: async (req, rep,next) => {
		try {
            if(req.body.operation=='register') {next();return;}
            if(req.body.operation!='login') throw new Error("invalid operation");
            console.log(req.body);
            if(!req.body.username || !req.body.password)
                throw new Error("invalid request")
            const x = await model.login(req.body.username,req.body.password);
            if(x) {
                req.session.isAuth = true;
                req.session.role = 'client';
                req.session.username = req.body.username;
                rep.send({msg:true})
            }
            else throw new Error("invalid account")
        } catch (error) {
            console.log(error);
            rep.status(404).send({msg:false,err:error.message})
        }
	},
    register : async (req, rep,next) => {
        try {
            if(!req.body.username || !req.body.password)
                throw new Error("invalid request")
            const x = await model.create(req.body.username,req.body.password);
            if(x) rep.send({msg:true})
            else throw new Error("user exist")
        } catch (error) {
            console.log(error);
            rep.status(404).send({msg:false,err:error.message})
        }
    },
    logout : async (req, rep,next) => {
        try {
            if( req.session.isAuth ){
                req.session.isAuth = false;
                req.session.role = 'visitor';
                req.session.username = undefined;
                rep.send({msg:true})
            }
            else throw new Error("server error")
        } catch (error) {
            console.log(error);
            rep.status(404).send({msg:false,err:error.message})
        }
    }
};
