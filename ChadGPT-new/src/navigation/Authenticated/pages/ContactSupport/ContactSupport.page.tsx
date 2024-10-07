import { CreateSupportChannelForm } from "#modules/Profile/Params/Support/view/CreateSupportChannelForm";
import { PageHeader } from "#shared/view/components/PageHeader";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { useNavigation } from "@react-navigation/native";

export const ContactSupportPage: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <PageTemplate>
      <PageHeader headerText="Contact support" onCrossIconPress={goBack} />
      <CreateSupportChannelForm />
    </PageTemplate>
  );
};
