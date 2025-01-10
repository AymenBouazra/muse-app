const User = require("../models/user")



User.countDocuments().then(async (usersCount) => {
    if (usersCount === 0) {
        const usersToInsert = [
            {
                firstname: "Aymen",
                lastname: "Administrator",
                email: "admin@muse.com",
                password: "$2a$10$MDIRedaQqMwEzx78OdnOR.8ve5/W42.qDXm/GgQYkTsYfeioKmBkG",
                picture: 'https://i.imgur.com/lh8Sd5C.png'
            },
        ]
        await User.create(usersToInsert);
    }
});


console.log(`=> All collections has been seeded successfully!`);