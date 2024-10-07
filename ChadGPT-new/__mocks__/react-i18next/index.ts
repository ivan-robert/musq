// this mock makes sure any components using the translate hook can use it without a warning being shown
export const useTranslation = () => {
  return {
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  };
};
export const initReactI18next = {
  type: "3rdParty",
  init: () => {},
};

export const Trans = ({ children }: { children: React.ReactElement }) =>
  children;
