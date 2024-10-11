import {  Response } from "express";
import { loginSchema } from "../schemas/login";
import { createJWT } from "../utils/jwt";
import { findTenantByIds } from "../services/auth";
import { ExtendedRequest } from "../types/extended-request";

export const login = async(req: ExtendedRequest, res: Response) => {
    const safeData = loginSchema.safeParse(req.body);
    if(!safeData.success) {
        return res.json({error: safeData.error.flatten().fieldErrors});
    };

    const tenant = await findTenantByIds(
        safeData.data.clientId,
        safeData.data.clientSecret
    )

    if(!tenant) {
        return res.status(401).json({error: 'Não autorizado'})
    }

    const token = createJWT(
        safeData.data.clientId,
        safeData.data.clientSecret
        )

    return res.status(200).json({access_token: token});    
    
}