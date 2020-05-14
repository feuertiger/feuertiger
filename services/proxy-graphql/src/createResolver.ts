import { IResolvers } from 'apollo-server';
import { Node } from '@feuertiger/schema-graphql';
import { ParseId } from '@feuertiger/utils-graphql';
import { visionOCR } from '@feuertiger/ocr';

export default () => {
    const customResolvers: IResolvers = {
        Query: {
            ocr: async (_parent: any, args: { image: string }) => {
                const { image } = args;
                const text = await visionOCR(image);
                return text;
            }
        }
    };

    const typeResolvers: IResolvers = {
        Node: {
            __resolveType: (source: Node) => {
                const { id } = source;
                const { type } = ParseId(id);
                return type;
            }
        }
    };

    return {
        ...typeResolvers,
        ...customResolvers
    };
};
