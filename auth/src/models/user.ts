import mongoose from 'mongoose';

interface userAttributes {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<any> {
  build(attributes: userAttributes): any;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export const User = mongoose.model<any, UserModel>('User', userSchema);

// nestia의 타입을 가져오는 것에 대한 단서가 될지도..?
userSchema.statics.build = (attributes: userAttributes) => {
  return new User(attributes);
};

User.build({
  email: 'asd',
  password: 'asd',
});

// !! monogoose에서 타입 체킹을 하기 위해 함수를 통해 데이터를 생성한다.
// export const buildUser = (attributes: userAttributes) => {
//   return new User(attributes);
// };
