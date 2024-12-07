import { LocaleKeysType } from '@/types/lang';

export const getSlugsFromPathName = (pathName: string) => {
  const reg = /[^\/]+/g;
  const matches = pathName.matchAll(reg);
  const matchedString = [...matches];

  return {
    fullPathName: pathName,
    lang: (matchedString?.[0]?.[0]) as LocaleKeysType,
    firstSlug: (matchedString?.[1]?.[0]) ?? '',
    secondSlug: (matchedString?.[2]?.[0]) ?? '',
    thirdSlug: (matchedString?.[3]?.[0]) ?? '',
  };
};
