import { FindUs } from '../../components/FindUs';
import { ContactUs } from '../../components/ContactUs';
import { SEO } from '../../components/SEO';
import { Header, Section, Container } from '../../components/Layout';
import { H1 } from '../../components/Typography';
import CampaignList from '../../components/CampaignList';

export default function Crowdfund() {
  return (
    <>
      <SEO title="Crowdfundind by Coderplex" />
      <Header title="Coderplex Crowdfunding" />
      <Container className="flex-col">
        <Section className="py-4 md:w-100 md:flex-1">
          <H1 className="mb-4">Crowdfunding campaigns</H1>
          <CampaignList />
        </Section>
        <Section className="bottom-0">
          <FindUs />
          <ContactUs />
        </Section>
      </Container>
    </>
  );
}
