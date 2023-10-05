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