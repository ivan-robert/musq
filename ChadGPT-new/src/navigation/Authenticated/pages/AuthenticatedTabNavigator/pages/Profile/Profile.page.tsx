import { ButtonsSection } from "#modules/Profile/view/ButtonsSection";
import { GeneralSection } from "#modules/Profile/view/GeneralSection";
import { PageTemplate } from "#shared/view/components/PageTemplate";
import { Spacer } from "#shared/view/components/Spacer";

export const ProfilePage = () => {
  return (
    <PageTemplate type="tab">
      <Spacer.Vertical gap={24} />
      <GeneralSection />
      <Spacer.Vertical gap={16} />
      <ButtonsSection />
      <Spacer.Flex />
    </PageTemplate>
  );
};
