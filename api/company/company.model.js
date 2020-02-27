const { SealedModel } = require("../../utilities/model.primitives");

const Create = SealedModel(
    {
        
    }
);

exports.create = data => new Promise(resolve => 
    resolve(new Create(data))
);
