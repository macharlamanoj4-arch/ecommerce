// import { PrismaClient } from '../generated/prisma/client'
// import { defineConfig } from 'prisma/config';

// import { PrismaPg } from "@prisma/adapter-pg";

// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
// const prisma = new PrismaClient({ adapter });


// export class PrismaService {
//     private static instance: PrismaService;
//     private _prisma: PrismaClient;

//     private constructor() {
//         this._prisma = new Prisma(defineConfig());
//     }

//     public static getInstance(): PrismaService {
//         if (!PrismaService.instance) {
//             PrismaService.instance = new PrismaService();
//         }
//         return PrismaService.instance;
//     }

//     public get prisma(): PrismaClient {
//         return this._prisma;
//     }
// }

