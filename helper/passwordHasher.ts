import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';

export const passwordHasher = {
  hash: async (password) => await bcrypt.hash(password, 10),
  compare: async (password, hashPassword) => {
    const isPasswordMatched = await bcrypt.compare(password, hashPassword);
    if (!isPasswordMatched) {
      throw new GraphQLError('Wrong email or password');
    }
  },
};
