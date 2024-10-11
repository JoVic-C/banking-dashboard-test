import { NextFunction, Response } from "express";
import  jwt from "jsonwebtoken"
import { prisma } from "./prisma";
import { ExtendedRequest } from "../types/extended-request";

export const createJWT = (clientId: string, clientSecret: string) => {
    return jwt.sign({clientId, clientSecret}, process.env.JWT_SECRET as string, { expiresIn: '2h' });

}

export const verifyJWT = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) return res.status(401).json({ error: 'Acesso negado'});

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        async (error, decoded: any) => {
            if(error) return res.status(401).json({ error: 'Acesso negado'});

            const tentant = await prisma.tenant.findFirst({ where: {clientId: decoded.clientId}});
            if(!tentant) return res.status(401).json({ error: 'Acesso negado'});

                    

            req.tenant = tentant.clientId;
            next();

        }
    )


}

export const verifyXPayer = async(req: ExtendedRequest, res: Response, next: NextFunction) => {
    const payerDocument = req.headers['x-payer-id'];


    const account = await prisma.account.findFirst({
                    where: { document: payerDocument as string },
                    });

                    if (!account) {
                    return res.status(403).json({ error: 'Pagador não encontrado' });
                    }

            req.body.payerAccount = account;

            next();
    


}