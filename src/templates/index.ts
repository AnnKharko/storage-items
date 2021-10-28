import { emailActionEnum } from '../../constants';
export default {
  [emailActionEnum.CONFIRM]: {
    templateName: './confirmation',
    subject: 'Welcome to Nice App! Confirm your Email',
  },
  [emailActionEnum.WELCOME]: {
    templateName: './welcome',
    subject: 'Welcome in the jungle',
  },
};
