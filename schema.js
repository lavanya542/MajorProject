const Joi =require('joi');
module.exports. listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null),
        country:Joi.string().required(),
        location:Joi.string().required(),

    })
})

module.exports. reviewSchema=Joi.object({
    review: {
      comment: Joi.string().required(),
      rating: Joi.number().required().min(1).max(5)
    }
})