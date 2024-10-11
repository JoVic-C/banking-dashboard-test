import { prisma } from "../utils/prisma"

export const addAccount = async(accountType: string, name: string, document: string, tenantId: string) => {
    const newAccount = await prisma.account.create({
        data: {
            accountType,
            name,
            document,
            tenantId
        }
    }) 

    return newAccount;

}

export const findAccountById = async(id: string) => {
    const account = await prisma.account.findFirst({
        where: {
            id
        },
        include: {
            transactions: true
        }
    })

    return account;

}

export const findAccountByDocument = async(document: string) => {
    const account = await prisma.account.findFirst({
        where: {
            document
        }
    })

    return account;

}

export const getStatementById = async(id: string) => {
    const account = await prisma.account.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            balance: true,
            transactions: true,
            
        }
    })

    return account;
}

