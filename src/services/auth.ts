import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma"

export const createTenant = async() => {
    const tenant = await prisma.tenant.create({
        data: {}
    })

    return tenant;
}

export const findTenant = async() => {
    const tenant = await prisma.tenant.findFirst({
    })

    return tenant;
}

export const findTenantByIds = async(clientId: string, clientSecret: string) => {
    const tenant = await prisma.tenant.findFirst({
        where: {
            clientId,
            clientSecret
        }
    })

    return tenant;
}

export const login = async(clientId: string, clientSecret: string) => {

}