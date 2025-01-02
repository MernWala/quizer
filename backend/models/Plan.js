import mongoose, { Schema } from 'mongoose'

const PlanSchema = new Schema({
    // TODO: It will defined at second release
}, { timestamps: true })

const plan = mongoose.model('plan', PlanSchema)

export default plan