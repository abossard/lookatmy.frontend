import { Request } from "express";

export class BearerStrategy {
    constructor(options: any, verifyFn: any);

    public authenticate(req: any): any;

    public failWithLog(message: any): any;

    public jwtVerify(req: any, token: any, metadata: any, optionsToValidate: any, done: any): any;

    public loadMetadata(params: any, next: any): any;

}

export interface IOIDCStrategyOptions {
    identityMetadata: string;
    clientID: string;
    responseType: string;
    responseMode: string;
    redirectUrl: string;
    allowHttpForRedirectUrl: boolean;
    clientSecret?: string;
    validateIssuer?: boolean;
    isB2C?: boolean;
    issuer?: string;
    passReqToCallback?: false;
    scope?: string;
    loggingLevel?: string;
    nonceLifetime?: number;
    nonceMaxAmount?: number;
    useCookieInsteadOfSession?: boolean;
    cookieEncryptionKeys?: string[];
    clockSkew?: number;
}
export interface IOIDCStrategyOptionsWithRequest {
    identityMetadata: string;
    clientID: string;
    responseType: string;
    responseMode: string;
    redirectUrl: string;
    allowHttpForRedirectUrl: boolean;
    clientSecret?: string;
    validateIssuer?: boolean;
    isB2C?: boolean;
    issuer?: string;
    passReqToCallback: true;
    scope?: string;
    loggingLevel?: string;
    nonceLifetime?: number;
    nonceMaxAmount?: number;
    useCookieInsteadOfSession?: boolean;
    cookieEncryptionKeys?: string[];
    clockSkew?: number;
}

export type OICDVerifyCallback = (
    iss: string,
    sub: string,
    profile: string,
    accessToken: string,
    refreshToken: string,
    done: any,
) => void;

export type OICDVerifyCallbackWithRequest = (
    req: Request,
    iss: string,
    sub: string,
    profile: string,
    accessToken: string,
    refreshToken: string,
    done: any,
) => void;

export class OIDCStrategy {
    constructor(options: IOIDCStrategyOptionsWithRequest, verify: OICDVerifyCallbackWithRequest);
    constructor(options: IOIDCStrategyOptions, verify: OICDVerifyCallback);

    public authenticate(req: any, options: any): any;

    public collectInfoFromReq(params: any, req: any, next: any, response: any): any;

    public failWithLog(message: any): any;

    public setOptions(params: any, oauthConfig: any, optionsToValidate: any, done: any): any;

}
