import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { User } from './schemas/User';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session'
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const databaseURL =
    process.env.DATABASE_URL || 'mongodb://localhost/keystone-vinyl-shop';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // sign in cookie lifespan
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO: Add in initial roles here
    }
})

export default withAuth(
    config({
        server: {
            cors: {
                origin: [process.env.FRONTEND_URL],
                credentials: true,
            },
        },
        db: {
            adapter: 'mongoose',
            url: databaseURL,
            async onConnect(keystone) {
                console.log("Connected to the database!");
                if (process.argv.includes('--seed-data')) {
                    await insertSeedData(keystone);
                }
            }
        },
        lists: createSchema({
            // Schema items will go here.
            User,
            Product,
            ProductImage,
        }),
        ui: {
            // show ui only for approval
            isAccessAllowed: ({ session }) => {
                console.log(session);
                return session?.data;
            },
        },
        session: withItemData(statelessSessions(sessionConfig), {
            User: `id`
        })
    })
);
