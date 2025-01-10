import { body } from "express-validator"

export const validateFormObject = (key) => body(key)
    .exists()
    .withMessage(`${key} object not found!`)
    .bail()
    .isArray()
    .withMessage(`${key} should be a valid array of object!`)
    .custom((arr) => {
        const validTags = ['input', 'select', 'textarea'];
        for (let index = 0; index < arr.length; index++) {
            const obj = arr[index];

            // Validate label
            if (!obj.label || typeof obj.label.value !== 'string') {
                throw new Error('Invalid label: "value" is required and must be a string.');
            }

            if (obj.label.attributes && !Array.isArray(obj.label.attributes)) {
                throw new Error('Invalid label: "attributes" must be an array.');
            }

            // Validate tag
            if (!obj.tag || typeof obj.tag !== 'object') {
                throw new Error('Invalid tag: "tag" is required and must be an object.');
            }

            if (!validTags.includes(obj.tag.tag)) {
                throw new Error(`Invalid tag: "tag" must be one of ${validTags.join(', ')}.`);
            }

            if (obj.tag.type !== null && typeof obj.tag.type !== 'string') {
                throw new Error('Invalid tag: "type" must be null or a string.');
            }

            if (obj.tag.attributes && !Array.isArray(obj.tag.attributes)) {
                throw new Error('Invalid tag: "attributes" must be an array.');
            }

            if (obj.tag.children && !Array.isArray(obj.tag.children)) {
                throw new Error('Invalid tag: "children" must be an array.');
            }

            if (obj.tag.children) {
                obj.tag.children.forEach(child => {
                    if (typeof child !== 'object' || !child.tag || !Array.isArray(child.attributes) || typeof child.children !== 'string') {
                        throw new Error('Invalid tag: "children" must be an array of valid objects.');
                    }
                });
            }

            if (typeof obj.tag.require !== 'boolean') {
                throw new Error('Invalid tag: "require" is required and must be a boolean.');
            }

            if (typeof obj.tag.name !== 'string') {
                throw new Error('Invalid tag: "name" is required and must be a string.');
            }

            if (typeof obj.tag.id !== 'string') {
                throw new Error('Invalid tag: "id" is required and must be a string.');
            }
        }

        return true
    });

    
/* Input formate for FormFields
    
    {
        label: {
            value: "Some label here",       // required filed
            attributes: [                   // optional
                { className: "" },
            ]
        },
        tag: {
            tag: "select",                  // required filed of enum type => [input, select, textarea]
            type: null,                     // required filed it might be null
            attributes: [
                { className: "" },          // optional field
            ],
            children: [                     // optional but must be validated 
                {
                    tag: "option",
                    attributes: [
                        { value: "some value" },
                        { className: "" }
                    ],
                    children: "Some children",
                },
            ],
            require: true,                  // required filed
            name: "Some label here",        // required filed
            id: "Some label here"           // required filed
        }
    }

 */