import { DisputeStatus, Resolution } from "../../enums.ts";

export type getDisputes = {
    readonly startDate: string,
    readonly endDate: string,
    readonly pagination: number,
    readonly page: number,
    readonly transaction?: string,
    readonly status?: DisputeStatus;
};

export type updateDisputePayload = {
    readonly id: string,
    readonly refundAmount: number,
    uploadFilename?: string 
};

export type addEvidencePayload ={
    readonly id: string,
    readonly customerEmail: string,
    readonly customerName: string,
    readonly customerPhone: string,
    readonly serviceDetails: string,
    readonly deliveryAddress?: string,
    readonly deliveryDate?: string,
};

export type resolveDisputePayload = {
    readonly id: string,
    readonly resolution: Resolution,
    readonly message: string,
    readonly refundAmount: number,
    readonly uploadedFilename: string,
    readonly evidence?: number, 
};



