module.exports = (sequelize, DataTypes) => {
    const Contacts = sequelize.define('contacts', {
        userId: {type: DataTypes.INTEGER, allowNull: false},
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
        phone: {type: DataTypes.STRING, allowNull: false},
        address: {type: DataTypes.STRING, allowNull: false},
    })
    return Contacts;
}