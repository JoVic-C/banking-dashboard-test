import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { tranferTedSchema } from "../schemas/transfer-ted";
import { createTransaction, createTransferDoc, createTransferInternal, createTransferPix, createTransferTed, findPixKey } from "../services/transactions";
import { findAccountByDocument, findAccountById } from "../services/account";
import { prisma } from "../utils/prisma";
import { tranferDocSchema } from "../schemas/transfer-doc";
import { getPixKeySchema } from "../schemas/get-pix-key";
import { addBillet } from "../services/billet";
import { createBilletSchema } from "../schemas/create-billet";
import { transferPixSchema } from "../schemas/transfer-pix";
import { generateE2EId } from "../utils/generate-e2eID";
import { transferInternalSchema } from "../schemas/transfer-internal";

export const transferTed = async(req: ExtendedRequest, res: Response) => {
    const safeData = tranferTedSchema.safeParse(req.body);
    if(!safeData.success) {
        return res.status(400).json({error: safeData.error.flatten().fieldErrors});
    };
    
    const payer = req.headers['x-payer-id']
    const account = await findAccountByDocument(payer as string)


    if(account?.balance! < safeData.data.amount) {
        return res.status(400).json({error: 'Saldo insuficiente'})
    }

    const transaction = await createTransaction({
        account: { connect: { id: account?.id}}
    })


    const ted = await createTransferTed({
        
            transaction: { connect: { id: transaction.id}},
            amount: safeData.data.amount,
            recipientAccount: safeData.data.recipientAccount,
            recipientBank: safeData.data.recipientBank,
            recipientBranch: safeData.data.recipientBranch,
            recipientDocument: safeData.data.recipientDocument,
            recipientName: safeData.data.recipientName
            

            

        
    })

    const totalBalance = account?.balance! - ted.amount

    await prisma.account.update({
        where: {
            id: transaction.accountId
        },
        data: {
            balance: totalBalance
        }
    }) 

    return res.status(201).json(ted)
}

export const transferDoc = async(req: ExtendedRequest, res: Response) => {
    const safeData = tranferDocSchema.safeParse(req.body);
    if(!safeData.success) {
        return res.status(400).json({error: safeData.error.flatten().fieldErrors});
    };
    
    const payer = req.headers['x-payer-id']

    const account = await findAccountByDocument(payer as string)

    if(account?.balance! < safeData.data.amount) {
        return res.status(400).json({error: 'Saldo insuficiente'})
    }

    const transaction = await createTransaction({
        account: { connect: { id: account?.id}}
    })


    const doc = await createTransferDoc({
        
            transaction: { connect: { id: transaction.id}},
            amount: safeData.data.amount,
            recipientAccount: safeData.data.recipientAccount,
            recipientBank: safeData.data.recipientBank,
            recipientBranch: safeData.data.recipientBranch,
            recipientDocument: safeData.data.recipientDocument,
            recipientName: safeData.data.recipientName
            

            

        
    })

    const totalBalance = account?.balance! - doc.amount

    await prisma.account.update({
        where: {
            id: transaction.accountId
        },
        data: {
            balance: totalBalance
        }
    }) 

    return res.status(201).json(doc)
}

export const createBillet = async(req: ExtendedRequest, res: Response) => {

    const safeData = createBilletSchema.safeParse(req.body);
    if(!safeData.success) {
        return res.status(400).json({error: safeData.error.flatten().fieldErrors});
    };

    const payer = req.headers['x-payer-id']
    const account = await findAccountByDocument(payer as string)

    const transaction = await createTransaction({
        account: { connect: { id: account?.id}}
    })
    
    const billet = await addBillet(
        {
        billetCode: safeData.data.billetCode,
        amount: safeData.data.amount,
        dueDate: safeData.data.dueDate,
        transaction: { connect: { id: transaction.id}}
        }
    );

    if(account?.balance! < billet.amount) {
        return res.status(400).json({error: 'Saldo insuficiente'})
    };

    const totalBalance = account?.balance! - billet.amount

    await prisma.account.update({
        where: {
            id: transaction.accountId
        },
        data: {
            balance: totalBalance
        }
    });

    return res.status(201).json(billet)
}

export const getPixKey = async(req: ExtendedRequest, res: Response) => {

    const safeParams = getPixKeySchema.safeParse(req.params);
    if(!safeParams.success) {
        return res.status(400).json({error: safeParams.error.flatten().fieldErrors});
    };

    const pixKey = await findPixKey(
        safeParams.data.pixKey
    )

    if(!pixKey) {
        return res.status(400).json({error: 'Pix não existe'})
    }

    const newE2E = generateE2EId()
    

    const newBalance = await prisma.pix.update({
        data: {
            e2eId: newE2E
        },
        where: {
            id: pixKey.id

        }
    })

    return res.status(200).json(newBalance)

}

export const transferPix = async(req: ExtendedRequest, res: Response) => {

    const { accountId } = req.params

    const safeData = transferPixSchema.safeParse(req.body);
    if(!safeData.success) {
        return res.status(400).json({error: safeData.error.flatten().fieldErrors});
    };

    const account = await findAccountById( accountId )

    const transaction = await createTransaction({
        account: { connect: { id: account?.id}}
    })

    const pixKeyIsValid = await findPixKey(safeData.data.pixKey)
    if(!pixKeyIsValid) {
        return res.status(400).json({error:'Pix invalido'});
    }

    if(safeData.data.e2eId != pixKeyIsValid.e2eId) {
        return res.status(400).json({error: 'Transação invalida'})
    };
    const pix = await createTransferPix({
        amount: safeData.data.amount,
        e2eId: safeData.data.e2eId,
        pixKey: safeData.data.pixKey,
        description: safeData.data.description,
        transaction: { connect: { id: transaction.id}},
        pix: { connect: { id: pixKeyIsValid.id}},
    }
  
    );

    if(account?.balance! < pix.amount) {
        return res.status(400).json({error: 'Saldo insuficiente'})
    };

    const totalBalance = account?.balance! - pix.amount

    await prisma.account.update({
        where: {
            id: account?.id
        },
        data: {
            balance: totalBalance
        }
    });

    return res.status(201).json(pix)
}

export const tranferInternal = async(req: ExtendedRequest, res: Response) => {

    const safeData = transferInternalSchema.safeParse(req.body);
    if(!safeData.success) {
        return res.status(400).json({error: safeData.error.flatten().fieldErrors});
    };

    const payer = req.headers['x-payer-id']
    const account = await findAccountByDocument(payer as string)

    const transaction = await createTransaction({
        account: { connect: { id: account?.id}}
    })

    const internal = await createTransferInternal({
        targetAccountId: safeData.data.targetAccountId,
        sourceAccountId: safeData.data.sourceAccountId,
        amount: safeData.data.amount,
        description: safeData.data.description,
        transaction: { connect: { id: transaction.id}},
    });

    if(!internal) {
        return res.status(400).json({error: 'Algo deu errado na transação'})
    }

    if(account?.balance! < internal.amount) {
        return res.status(400).json({error: 'Saldo insuficiente'})
    };

    const totalBalance = account?.balance! - internal.amount

    await prisma.account.update({
        where: {
            id: account?.id
        },
        data: {
            balance: totalBalance
        }
    });

    return res.status(201).json(internal)

}