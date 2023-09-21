import { atom } from 'recoil';

export const bagAddModalState = atom<boolean>({
    key: 'bagAddModalState',
    default: false,
});

export const bagName = atom<String>({
  key: 'bagName ',
  default: "",
});