import { schema } from 'normalizr';
import userSchema from './user';

const track = new schema.Entity('tracks',{
   user : userSchema
});

const trackSchema = [ track ];

export default trackSchema;