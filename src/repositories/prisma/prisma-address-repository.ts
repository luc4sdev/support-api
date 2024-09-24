import { prisma } from "@/lib/prisma";
import { Address } from '@prisma/client'
import { AddressRepository } from "../address-repository";


export class PrismaAddressRepository implements AddressRepository {

    async findById(id: string): Promise<Address | null> {
        const address = await prisma.address.findUnique({
            where: {
                id,
            },
        })

        return address
    }

}