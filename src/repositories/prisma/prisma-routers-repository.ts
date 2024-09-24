import { RouterWithClients } from './../../use-cases/router/get-router/get-router';
import { prisma } from "@/lib/prisma";
import { RoutersRepository } from "../routers-repository";
import { CreateRouterUseCaseRequest } from "@/use-cases/router/create-router/create-router";
import { UpdateRouterUseCaseRequest } from '@/use-cases/router/update-router/update-router';
import { DeleteRouterUseCaseRequest } from '@/use-cases/router/delete-router/delete-router';
import { Router } from '@prisma/client';
//import { getClient } from '@/lib/elasticsearch';

//const elasticClient = getClient()

export class PrismaRoutersRepository implements RoutersRepository {

    async findMany(): Promise<RouterWithClients[] | null> {
        const routers = await prisma.router.findMany({
            where: {
                deleted: false
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        if (!routers) {
            return null;
        }

        const routersWithClients: RouterWithClients[] = await Promise.all(routers.map(async router => {
            const clients = await prisma.client.findMany({
                where: {
                    routerId: router.id,
                },
            });

            return {
                ...router,
                clientsIds: clients.map(client => client.id),
            };
        }));

        return routersWithClients
    }

    async findById(id: string): Promise<RouterWithClients | null> {
        const router = await prisma.router.findUnique({
            where: {
                id,
            },
        })
        if (!router) {
            return null
        }

        const clients = await prisma.client.findMany({
            where: {
                routerId: router?.id
            }
        })

        const routerWithClients = {
            ...router,
            clientsIds: clients.map(client => client.id)
        }

        return routerWithClients
    }


    async create(routerToBeCreated: CreateRouterUseCaseRequest): Promise<Router> {


        const router = await prisma.router.create({
            data: {
                ipAddress: routerToBeCreated.ipAddress,
                ipv6Address: routerToBeCreated.ipv6Address,
                brand: routerToBeCreated.brand,
                model: routerToBeCreated.model,
                active: (routerToBeCreated && routerToBeCreated.clientsIds && routerToBeCreated.clientsIds?.length > 0) ? true : false,
                client: {
                    connect: routerToBeCreated.clientsIds?.map(id => ({ id })) ?? []
                }
            }
        })

        // await elasticClient.index({
        //     index: "routers",
        //     id: router.id,
        //     body: {
        //         id: router.id,
        //         ipAddress: routerToBeCreated.ipAddress,
        //         ipv6Address: routerToBeCreated.ipv6Address,
        //         brand: routerToBeCreated.brand,
        //         model: routerToBeCreated.model,
        //         active: router.active,
        //         deleted: router.deleted,
        //         clientsIds: routerToBeCreated.clientsIds,
        //         createdAt: router.createdAt,
        //         updatedAt: router.updatedAt,
        //     },
        // });

        await prisma.client.updateMany({
            where: {
                routerId: router.id
            },
            data: {
                active: true
            }
        })

        // if (routerToBeCreated.clientsIds) {
        //     await elasticClient.updateByQuery({
        //         index: 'clients',
        //         body: {
        //             script: {
        //                 source: `
        //                     ctx._source.routerId = params.routerId;
        //                     ctx._source.active = params.active;
        //                 `,
        //                 lang: 'painless',
        //                 params: {
        //                     routerId: router.id,
        //                     active: true
        //                 }
        //             },
        //             query: {
        //                 terms: {
        //                     id: routerToBeCreated.clientsIds
        //                 }
        //             }
        //         }
        //     });
        // }

        return router
    }


    async update(routerToBeUpdated: UpdateRouterUseCaseRequest): Promise<Router> {


        const router = await prisma.router.update({
            where: {
                id: routerToBeUpdated.id
            },
            data: {
                ipAddress: routerToBeUpdated.ipAddress,
                ipv6Address: routerToBeUpdated.ipv6Address,
                brand: routerToBeUpdated.brand,
                model: routerToBeUpdated.model,
                active: (routerToBeUpdated && routerToBeUpdated.clientsIds && routerToBeUpdated.clientsIds?.length > 0) ? true : false,
                client: {
                    set: routerToBeUpdated.clientsIds?.map(id => ({ id })) ?? []
                }
            }
        })

        // await elasticClient.update({
        //     index: "routers",
        //     id: router.id,
        //     body: {
        //         doc: {
        //             id: router.id,
        //             ipAddress: routerToBeUpdated.ipAddress,
        //             ipv6Address: routerToBeUpdated.ipv6Address,
        //             brand: routerToBeUpdated.brand,
        //             model: routerToBeUpdated.model,
        //             active: router.active,
        //             deleted: router.deleted,
        //             clientsIds: routerToBeUpdated.clientsIds,
        //             createdAt: router.createdAt,
        //             updatedAt: router.updatedAt,
        //         },
        //     },
        // });

        await prisma.client.updateMany({
            where: {
                id: {
                    in: routerToBeUpdated.clientsIds
                }
            },
            data: {
                routerId: routerToBeUpdated.id,
                active: true
            }
        })


        // if (routerToBeUpdated.clientsIds) {
        //     await elasticClient.updateByQuery({
        //         index: 'clients',
        //         body: {
        //             script: {
        //                 source: `
        //                     ctx._source.routerId = params.routerId;
        //                     ctx._source.active = params.active;
        //                 `,
        //                 lang: 'painless',
        //                 params: {
        //                     routerId: routerToBeUpdated.id,
        //                     active: true
        //                 }
        //             },
        //             query: {
        //                 terms: {
        //                     id: routerToBeUpdated.clientsIds
        //                 }
        //             }
        //         }
        //     });
        // }

        const routersToUpdate = await prisma.router.findMany({
            where: {
                client: {
                    none: {}
                }
            },
            select: {
                id: true
            }
        });

        for (const router of routersToUpdate) {
            await prisma.router.update({
                where: {
                    id: router.id
                },
                data: {
                    active: false
                }
            });

        }

        await prisma.client.updateMany({
            where: {
                routerId: null
            },
            data: {
                active: false
            }
        })


        // await elasticClient.updateByQuery({
        //     index: 'clients',
        //     body: {
        //         script: {
        //             source: `
        //                 ctx._source.routerId = params.routerId;
        //                 ctx._source.active = params.active;
        //             `,
        //             lang: 'painless',
        //             params: {
        //                 routerId: 'null',
        //                 active: false
        //             }
        //         },
        //         query: {
        //             bool: {
        //                 must_not: {
        //                     exists: {
        //                         field: 'routerId'
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // });

        return router
    }


    async delete({ id }: DeleteRouterUseCaseRequest): Promise<Router> {

        const router = await prisma.router.findUnique({
            where: {
                id
            },
            include: {
                client: {
                    select: {
                        id: true
                    }
                }
            }
        });

        if (!router) {
            throw new Error('Router not found');
        }

        const clientIds = router.client.map(client => client.id);

        await prisma.client.updateMany({
            where: {
                id: {
                    in: clientIds
                }
            },
            data: {
                active: false
            }
        });


        // await elasticClient.updateByQuery({
        //     index: 'clients',
        //     body: {
        //         script: {
        //             source: `
        //                 ctx._source.active = params.active;
        //             `,
        //             lang: 'painless',
        //             params: {
        //                 active: false
        //             }
        //         },
        //         query: {
        //             terms: {
        //                 id: clientIds
        //             }
        //         }
        //     }
        // });

        const deletedRouter = await prisma.router.update({
            where: {
                id
            },
            data: {
                deleted: true,
                active: false
            }
        });

        // await elasticClient.delete({
        //     index: 'routers',
        //     id: id
        // })

        return deletedRouter;
    }


}