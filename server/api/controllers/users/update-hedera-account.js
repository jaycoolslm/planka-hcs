const bcrypt = require('bcrypt');

const Errors = {
  NOT_ENOUGH_RIGHTS: {
    notEnoughRights: 'Not enough rights',
  },
  USER_NOT_FOUND: {
    userNotFound: 'User not found',
  },
  INVALID_CURRENT_PASSWORD: {
    invalidCurrentPassword: 'Invalid current password',
  },
};

module.exports = {
  inputs: {
    id: {
      type: 'string',
      regex: /^[0-9]+$/,
      required: true,
    },
    hederaAccount: {
      type: 'string',
      required: true,
    },
    currentPassword: {
      type: 'string',
      isNotEmptyString: true,
    },
  },

  exits: {
    notEnoughRights: {
      responseType: 'forbidden',
    },
    userNotFound: {
      responseType: 'notFound',
    },
    invalidCurrentPassword: {
      responseType: 'forbidden',
    },
  },

  async fn(inputs) {
    const { currentUser } = this.req;

    if (inputs.id === currentUser.id) {
      if (!inputs.currentPassword) {
        throw Errors.INVALID_CURRENT_PASSWORD;
      }
    } else if (!currentUser.isAdmin) {
      throw Errors.NOT_ENOUGH_RIGHTS; // Forbidden
    }

    let user = await sails.helpers.users.getOne(inputs.id);

    if (!user) {
      throw Errors.USER_NOT_FOUND;
    }

    if (
      inputs.id === currentUser.id &&
      !bcrypt.compareSync(inputs.currentPassword, user.password)
    ) {
      throw Errors.INVALID_CURRENT_PASSWORD;
    }

    const values = _.pick(inputs, ['hederaAccount']);

    user = await sails.helpers.users.updateOne.with({
      values,
      record: user,
      actorUser: currentUser,
      request: this.req,
    });

    if (!user) {
      throw Errors.USER_NOT_FOUND;
    }

    return {
      item: user,
    };
  },
};
