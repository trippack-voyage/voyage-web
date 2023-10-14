import { atom } from 'recoil';

export const myModalState = atom<boolean>({
  key: 'myModalState',
  default: false,
});

//회원 정보-----------------------------
export const user_id = atom<Number>({
  key: 'user_id',
  default: 0,
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

//가방 정보-----------------------------------
export const bagAddModalState = atom<boolean>({ //가방 추가 모달
  key: 'bagAddModalState',
  default: false,
});

export const bagName = atom<String>({
key: 'bagName ',
default: "",
});

export const location = atom<String>({
  key: 'location',
  default: "",
});

export const start_date = atom<String>({
  key: 'start_date',
  default: "",
});

export const end_date = atom<String>({
  key: 'end_date',
  default: "",
});