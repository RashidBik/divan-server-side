module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        file: {
            type: DataTypes.BLOB('long'),
            allowNull: true,
        },
    });

Users.associate = (models)=> {
    Users.hasMany(models.Likes, {
        onDelete: "cascade", 

    });
    Users.hasMany(models.Posts, {
        onDelete: "cascade", 

    });
};


    return Users;
};

