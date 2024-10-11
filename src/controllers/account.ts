import {  Response } from "express";
import { createAccountSchema } from "../schemas/create-account";
import { addAccount, findAccountByDocument, findAccountById, getStatementById } from "../services/account";
import { getAccountSchema } from "../schemas/get-account-by-id";
import { findTenant } from "../services/auth";
import { getAccountDocSchema } from "../schemas/get-account-by-doc";
import { ExtendedRequest } from "../types/extended-request";

export const createAccount = async(req: ExtendedRequest, res: Response) => {

    const safeData = createAccountSchema.safeParse(req.body);
    if(!safeData.success) {
        return res.json({error: safeData.error.flatten().fieldErrors});
    };

    const tenant = await findTenant()

    const tenantId = tenant?.id
    

    const newAccount = await addAccount(
        safeData.data.accountType,
        safeData.data.name,
        safeData.data.document,
        tenantId as string
        
    )

    return res.status(201).json({newAccount: newAccount})

}

export const getAccountById = async(req: ExtendedRequest, res: Response) => {

    const safeParams = getAccountSchema.safeParse(req.params);
    if(!safeParams.success) {
        return res.status(404).json({error: safeParams.error.flatten().fieldErrors});
    };

    const account = await findAccountById(
        safeParams.data.id
    )

    if(!account) {
        return res.status(404).json({error: 'Conta invalida'})
    }

    return res.status(200).json({account: account})
}

export const getAccountByDoc = async(req: ExtendedRequest, res: Response) => {

    const safeParams = getAccountDocSchema.safeParse(req.params);
    if(!safeParams.success) {
        return res.status(404).json({error: safeParams.error.flatten().fieldErrors});
    };

    const account = await findAccountByDocument(
        safeParams.data.document
    )

    if(!account) {
        return res.status(404).json({error: 'Conta invalida'})
    }

    return res.status(200).json({account: account})
}

export const getStatement = async(req: ExtendedRequest, res: Response ) => {

    const safeParams = getAccountSchema.safeParse(req.params);
    if(!safeParams.success) {
        return res.status(404).json({error: safeParams.error.flatten().fieldErrors});
    };

    const account = await findAccountById(
        safeParams.data.id
    )

    if(!account) {
        return res.status(404).json({error: 'Conta invalida'})
    }

    const statement = await getStatementById(
        account.id
    )

    return res.status(200).json(statement)
}