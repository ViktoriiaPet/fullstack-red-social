import Joi from 'joi';

export const createRelationSchema = Joi.object({
    relationName: Joi.string().required()
});

