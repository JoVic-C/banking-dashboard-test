import { Request } from "express";

export type ExtendedRequest = Request & {
    tenant?: string;
    
}