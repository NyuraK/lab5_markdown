const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DocumentSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    creationDate: {
        type: Date
    },
    modificationDate: {
        type: Date
    }
});
const DocumentModel = mongoose.model('posts', DocumentSchema);
module.exports = DocumentModel;