import { PageTemplate } from "../../../../shared/view/components/PageTemplate";
import { AddExo } from "../../../../modules/Profile/Params/AddExo/view/AddExo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacer } from "#shared/view/components/Spacer";

export const AddExoPage = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <PageTemplate>
      <AddExo />
      <Spacer.Vertical gap={bottom} />
    </PageTemplate>
  );
};
