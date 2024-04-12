import mongoose from 'mongoose';

interface userAttributes {
  email: string;
  password: string;
}

/**
 * @description mongoose 모델 인스턴스에 대한 타입
 */
interface UserModel extends mongoose.Model<UserDoc> {
  build(attributes: userAttributes): UserDoc;
}

/**
 * @description mongoose의 document 속성에 대한 타입
 */
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
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

// nestia의 타입을 가져오는 것에 대한 단서가 될지도..?
userSchema.statics.build = (attributes: userAttributes) => {
  return new User(attributes);
};
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
// !! monogoose에서 타입 체킹을 하기 위해 함수를 통해 데이터를 생성한다.
// export const buildUser = (attributes: userAttributes) => {
//   return new User(attributes);
// };
