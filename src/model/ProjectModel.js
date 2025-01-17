import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
    {
        category: {
            type: [String],
           
            default: "Not-Provided"
        },

        semifurnishedprice: {
            type: String,
            default: "Not Provided"
        },

        fullfurnishedprice: {
            type: String,
            default: "Not Provided"
        },

        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        content: {
            type: String,
            
            default: "Not Provided"
        },
        location: {
            type: String,
            
        },
        projectSize: [
            {
                size: { type: String,  },
                image: { type: [String],  }
            }
        ],
        bhk: [
            {
                bhk: { type: String, },
                image: { type: [String],  }
            }
        ],
        isFeatured: {
            type: Boolean,
            
            default: false
        },
        propertyType: {
            type: String
        },
        possessionStatus: {
            type: String
        },
        AvailablePlot: {
            type: String
        },
        map: {
            type: String
        },
        logo: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: null
        },
        gallery: {
            type: [String],
            default: []
        },
        sitePlan: {
            type: String,
            default: null
        },
        pdf: {
            type: String,
            default: null
        },
        seoTitle: {
            type: String,
            trim: true
        },
        seoDescription: {
            type: String,
            trim: true
        },


        defaultValue: {
            type: String,
            default: "project"
        }
    },
    { timestamps: true }
);

const ProjectModel = mongoose.models.project666 || mongoose.model("project666", ProjectSchema);

export default ProjectModel;
