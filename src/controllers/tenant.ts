import {  Response } from "express";
import { createTenant, findTenant } from "../services/auth";
import { ExtendedRequest } from "../types/extended-request";


export const getMock = async(req: ExtendedRequest, res: Response) => {
    const isMock = req.headers['x-mock'] === 'true';

    if(isMock) {

        const newTenant = await createTenant()
        if(!newTenant) {
            return res.status(404).json({error: 'Não autorizado'})
        }
        return res.status(201).json(newTenant)
    }

    return res.status(401).json({error: 'Não autorizado'})
}