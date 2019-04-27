const { Schema, model } = require('mongoose');
const encryption = require('../utilities/encryption');

const userSchema = new Schema({
  email: { type: Schema.Types.String, required: true },
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String, required: true },
  salt: { type: Schema.Types.String, required: true },
  hashedPassword: { type: Schema.Types.String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  roles: [{ type: Schema.Types.String }]
});

userSchema.method({
  authenticate: function (password) {
    const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

    return currentHashedPass === this.hashedPassword;
  }
})

const User = model('User', userSchema);

User.seedAdminUser = async () => {
  try {
      let users = await User.find();
      if (users.length > 0) return;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword(salt, '123');
      return User.create({
          username: 'admin',
          firstName: 'Admincho',
          lastName: 'Adminov',
          salt,
          hashedPassword,
          email: 'admin@adminov.com',
          roles: ['Admin']
      });
  } catch (e) {
      console.log(e);
  }
};

module.exports = User;