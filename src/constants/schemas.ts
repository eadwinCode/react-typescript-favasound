import { schema } from 'normalizr';

const track = new schema.Entity('tracks');
const user = new schema.Entity('users');
const comment = new schema.Entity('comments');

track.define({
  user
});

comment.define({
    user
});

export const trackSchema = track;
export const userSchema = user;
export const commentSchema = comment;