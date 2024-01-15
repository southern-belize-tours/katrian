// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Faq } = initSchema(schema);

export {
  Faq
};