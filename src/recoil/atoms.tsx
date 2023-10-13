import { atom } from 'recoil';

export const bagAddModalState = atom<boolean>({
    key: 'bagAddModalState',
    default: false,
});

export const bagName = atom<String>({
  key: 'bagName ',
  default: "",
});

export const myModalState = atom<boolean>({
  key: 'myModalState',
  default: false,
});

//회원 정보
export const user_id = atom<String>({
  key: 'user_id',
  default: "",
});

export const user_name = atom<String>({
  key: 'user_name',
  default: "",
});

export const user_profile = atom<String>({
  key: 'user_profile',
  default: "",
});

export const user_accessToken = atom<String>({
  key: 'user_accessToken',
  default: "",
});