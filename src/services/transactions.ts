import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";


export const createTransaction = async(data: Prisma.TransactionCreateInput) => {

    const transaction = await prisma.transaction.create({
        data
    }) 
    return transaction;
}

export const createTransferTed = async(data: Prisma.TedCreateInput) => {


    const transactionTed = await prisma.ted.create({
        data,
        select: {
            amount: true,
            recipientName: true,
            recipientDocument: true,
            recipientBank: true,
            recipientBranch: true,
            recipientAccount: true,
            description: true
        }
    }) 
    return transactionTed;
}

export const createTransferDoc = async(data: Prisma.DocCreateInput) => {

    const transactionDoc = await prisma.doc.create({
        data,
        select: {
            amount: true,
            recipientName: true,
            recipientDocument: true,
            recipientBank: true,
            recipientBranch: true,
            recipientAccount: true,
            description: true
        }
    }) 
    return transactionDoc;
}

export const findPixKey = async(pixKey: string) => {

    
    const pixRecipient = await prisma.pix.findFirst({
        where: {
            pixKey
        },
        select: {
            id: true,
            pixKey: true,
            recipientName: true,
            recipientDocument: true,
            e2eId: true
            
        },
        
    })

    return pixRecipient;


}

export const createTransferPix = async(data: Prisma.TransferPixCreateInput) => {
    const transferPix = await prisma.transferPix.create({
        data
    })

    return transferPix;
    
}

export const createTransferInternal = async(data: Prisma.InternalCreateInput) => {
    const transferInternal = await prisma.internal.create({
        data,
        
    });

    return transferInternal;
}
