const mongoose = require('mongoose')
const Category = require('./Category')

const childCategorySchema = new mongoose.Schema({
    parent_category: {
        type: mongoose.Schema.Types.ObjectId,
        required:false,
        ref: Category
    },
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    sub_category: [new mongoose.Schema(
        {
            parent_type_id: {
                type: mongoose.Schema.Types.ObjectId,
                required:false
            },
            name: {
                type: String,
                required: false,
            },
            slug: {
                type: String,
                required: false,
            }
        }

    )]
})

module.exports = mongoose.model('ChildCategory', childCategorySchema)