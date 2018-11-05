import common from './common.js'
import Field from './field.js'
import documentsProperties from "./documentsProperties.json"

const getFieldsObject  = function(fieldsArray){
    var result = {}

    for(let def of fieldsArray){
        let field = new Field(def.id, def.properties)
        result[field.name] = field
    }

    return result
}

function Constants(){
    this.activities = common.attributes.activities

    this.langs = common.attributes.langs

    // You can find associations in
    //     https://github.com/c2corg/v6_common/blob/master/c2corg_common/associations.py

    // also, GUI avalaible associtions can be found here, on dataset attribute :
    //     https://github.com/c2corg/v6_ui/search?l=HTML&q=app-add-association

    this.documentTypes = Object.keys(documentsProperties)
    this.objectDefinitions = documentsProperties
    this.letterToDocumentType = {}

    for(let documentType of Object.keys(documentsProperties)){
        let documentProperties = documentsProperties[documentType]
        documentProperties.fields = getFieldsObject(documentProperties.fields)
        documentProperties.documentType = documentType
        this.letterToDocumentType[documentProperties.letter] = documentType
    }
}

export default new Constants()
