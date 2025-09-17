import bcrypt from 'bcrypt';

import UserModel from '../../app/Models/UserModel.js';

export default {

    up: async () => {
        const senha = "123456";

        const users = [];
        for (let i = 1; i <= 15; i++) {
            users.push({
                name: `User${i}`,
                email: `user${i}@example.com`,
                password: await bcrypt.hash(senha, 10)
            });
        }
        await UserModel.bulkCreate(users);
    },

    down: async () => {
        await UserModel.destroy({
            where: {
                email: [
                    'user1@example.com',
                    'user2@example.com',
                    'user3@example.com',
                    'user4@example.com',
                    'user5@example.com',
                    'user6@example.com'
                ]
            }
        });
    }
};
