"use server"
import { cache } from "react";
import mongoose from "mongoose";
import models from "@/src/models";
import dbConnect from "../../../src/lib/db/dbConnect";

export const incrementAndGetRifasCount = cache(async (session: mongoose.mongo.ClientSession) => {
    try {
        await dbConnect();
        const counter = await models.Counter.model.findOneAndUpdate(
            { key: "rifa" },
            { $inc: { value: 1 } },
            { new: true, upsert: true, session }
        );
        return counter;
    } catch (error) {
        return null;
    }
})