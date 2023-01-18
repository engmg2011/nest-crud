import * as process from "process";

export const jwtConstants = {
    secret: process.env.AUTH_SECRET || 'AuthSecret',
};