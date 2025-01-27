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
                size: { type: String, },
                image: { type: [String], }
            }
        ],
        bhk: [
            {
                bhk: { type: String, },
                image: { type: [String], }
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

        amenities: {
            gatedSociety: { type: Boolean, default: false },
            powerBackup: { type: Boolean, default: false },
            gym: { type: Boolean, default: false },
            solarPanel: { type: Boolean, default: false },
            openTerraceForParty: { type: Boolean, default: false },
            kidsPlayArea: { type: Boolean, default: false },
            societyTemple: { type: Boolean, default: false },
            reservedParking: { type: Boolean, default: false },
            indoorGames: { type: Boolean, default: false },
            miniTurf: { type: Boolean, default: false },
            campFire: { type: Boolean, default: false },
            intercomFacility: { type: Boolean, default: false },
            liftFacility: { type: Boolean, default: false },
            multiPurposeHall: { type: Boolean, default: false },
            roofTopGarden: { type: Boolean, default: false },
            lavishInterior: { type: Boolean, default: false },
            twoSideOpenBuilding: { type: Boolean, default: false },
            yogaDeck: { type: Boolean, default: false },
            sittingArea: { type: Boolean, default: false },
            waterSupply24x7: { type: Boolean, default: false },
            fireEquipment: { type: Boolean, default: false }
        },



        defaultValue: {
            type: String,
            default: "project"
        }
    },
    { timestamps: true }
);

const ProjectModel = mongoose.models.allproject || mongoose.model("allproject", ProjectSchema);

export default ProjectModel;
