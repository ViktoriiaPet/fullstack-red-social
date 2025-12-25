import Joi from 'joi';

const createRelationSchema = Joi.object({
    relationName: Joi.string().required()
});

module.exports = {
    createRelationSchema
}
