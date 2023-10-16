import { atom } from 'recoil';

//모달창 관리-----------------------------------
export const myModalState = atom<boolean>({ //my 모달창
  key: 'myModalState',
  default: false,
});

export const bagUpdateState = atom<boolean>({ //가방 수정
  key: 'bagUpdateState',
  default: false,
});

export const bagDelState = atom<boolean>({ //가방 삭제
  key: 'bagDelState',
  default: false,
});

export const bagState = atom<boolean>({ //가방 상태
  key: 'bagState',
  default: false,
});

//회원 정보-----------------------------
export const user_id = atom<any>({
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