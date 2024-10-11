import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export const addBillet = async(data: Prisma.BilletCreateInput) => {
    const newBillet = await prisma.billet.create({
        data
    })

    return newBillet;
}