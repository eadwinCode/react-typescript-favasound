import { schema } from 'normalizr';
import userSchema from './user';

const commentSchema = new schema.Entity('comments');

commentSchema.define({
  user: userSchema
});

export default commentSchema;