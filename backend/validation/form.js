import { body } from "express-validator";

const validTags = ['input', 'select', 'textarea', 'option'];
export const validateFormObject = (key) => body(key)
    .exists()
    .withMessage(`${key} object not found!`)
    .bail()
    .isArray()
    .withMessage(`${key} should be a valid array of objects!`)
    .custom((arr) => {
        arr.forEach((obj, index) => {
            if (!obj.label || typeof obj.label.value !== 'string') {
                throw new Error(`Invalid label at index ${index}: "value" is required and must be a string.`);
            }

            if (obj.label.attributes && !Array.isArray(obj.label.attributes)) {
                throw new Error(`Invalid label at index ${index}: "attributes" must be an array.`);
            }

            if (!obj.tag || typeof obj.tag !== 'object') {
                throw new Error(`Invalid tag at index ${index}: "tag" is required and must be an object.`);
            }

            if (!validTags.includes(obj.tag.tag)) {
                throw new Error(`Invalid tag at index ${index}: "tag" must be one of ${validTags.join(', ')}.`);
            }

            if (obj.tag.type !== null && typeof obj.tag.type !== 'string') {
                throw new Error(`Invalid tag at index ${index}: "type" must be null or a string.`);
            }

            if (obj.tag.attributes && !Array.isArray(obj.tag.attributes)) {
                throw new Error(`Invalid tag at index ${index}: "attributes" must be an array.`);
            }

            if (obj.tag.attributes) {
                const attributes = obj.tag.attributes.reduce((acc, attr) => ({ ...acc, ...attr }), {});
                if (typeof attributes.name !== 'string') {
                    throw new Error(`Invalid tag at index ${index}: "name" is required and must be a string.`);
                }

                if (typeof attributes.id !== 'string') {
                    throw new Error(`Invalid tag at index ${index}: "id" is required and must be a string.`);
                }
            }

            if (obj.tag.children && !Array.isArray(obj.tag.children)) {
                throw new Error(`Invalid tag at index ${index}: "children" must be an array.`);
            }

            if (obj.tag.children) {
                obj.tag.children.forEach((child, childIndex) => {
                    if (typeof child !== 'object' || !child.tag || !Array.isArray(child.attributes) || typeof child.children !== 'string') {
                        throw new Error(`Invalid child at index ${index}, child index ${childIndex}: "children" must be an array of valid objects.`);
                    }
                });
            }

            if (typeof obj.tag.required !== 'boolean') {
                throw new Error(`Invalid tag at index ${index}: "require" is required and must be a boolean.`);
            }
        });
        return true;
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
            required: true,                  // required filed
            name: "Some label here",        // required filed
            id: "Some label here"           // required filed
        }
    }

 */

const obj = [
    {
        label: {
            value: "Your Name",
            attributes: [{ className: "form-label" }]
        },
        wrapper: {
            tag: "input",
            attributes: [
                { type: "text" },
                { name: "name" },
                { id: "name" },
                { maxlength: "10" },
                { required: true },
                { className: "form-input" },
            ]
        }
    },
    {
        label: {
            value: "Registred Email ID",
            attributes: [{ className: "form-label" }]
        },
        wrapper: {
            tag: "input",
            attributes: [
                { type: "text" },
                { name: "name" },
                { id: "name" },
                { maxlength: "10" },
                { required: true },
                { className: "form-input" },
            ]
        }
    },
    {
        label: {
            value: "Select Gender",
            attributes: [{ className: "form-label" }]
        },
        wrapper: {
            tag: "select",
            attributes: [
                { required: true },
                { name: "gender" },
                { id: "gender" },
                { className: "form-select" },
            ],
            children: [
                {
                    tag: "option",
                    attributes: [
                        { value: "male" },
                        { className: "form-option" },
                    ],
                    innerText: "Male"
                },
                {
                    tag: "option",
                    attributes: [
                        { value: "Female" },
                        { className: "form-option" },
                    ],
                    innerText: "Female"
                },
                {
                    tag: "option",
                    attributes: [
                        { value: "Other" },
                        { className: "form-option" },
                    ],
                    innerText: "Other"
                },
            ]
        }
    },
    {
        label: {
            value: "Whatsapp Number",
            attributes: [{ className: "form-label" }]
        },
        wrapper: {
            tag: "input",
            attributes: [
                { type: "text" },
                { maxlength: "10" },
                { pattern: "\d{10}" },
                { title: "Not a valid phone number" },
                { required: true },
                { name: "phone" },
                { id: "phone" }
            ]
        }
    },
    {
        label: {
            value: "Choose Difficulty",
            attributes: [{ className: "form-radio" }]
        },
        wrapper: {
            tag: "div",
            attributes: [
                { className: "radio-button-set" }
            ],
            children: [
                {
                    tag: "div",
                    attributes: [{ className: "radio-wrapper" }],
                    children: [
                        {
                            tag: "label",
                            attributes: [],
                            innerText: "Easy"
                        },
                        {
                            tag: "input",
                            attributes: [
                                { type: "radio" },
                                { value: "Easy" },
                                { name: "difficulty" },
                            ]
                        },
                    ]
                },
                {
                    tag: "div",
                    attributes: [{ className: "radio-wrapper" }],
                    children: [
                        {
                            tag: "label",
                            attributes: [],
                            innerText: "Medium"
                        },
                        {
                            tag: "input",
                            attributes: [
                                { type: "radio" },
                                { value: "Medium" },
                                { name: "difficulty" },
                            ]
                        },
                    ]
                },
                {
                    tag: "div",
                    attributes: [{ className: "radio-wrapper" }],
                    children: [
                        {
                            tag: "label",
                            attributes: [],
                            innerText: "Hard"
                        },
                        {
                            tag: "input",
                            attributes: [
                                { type: "radio" },
                                { value: "Hard" },
                                { name: "difficulty" },
                            ]
                        },
                    ]
                },
            ]
        }
    },
]