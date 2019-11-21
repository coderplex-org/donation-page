import isMobile from 'is-mobile';

import FindUs from '../components/FindUs';
import ContactUs from '../components/ContactUs';
import PaymentForm from '../components/PaymentForm';
import MobileFooter from '../components/Footer';
import SEO from '../components/SEO';
import { Header, Section, Container } from '../components/Layout';
import { H1, H2, Paragraph } from '../components/Typography';

export default function Index() {
  return (
    <>
      <SEO />
      <Header />
      <Container>
        <Section className="py-4 md:w-1/2 md:flex-1">
          <H1>Donate to Coderplex</H1>
          <Paragraph>
            Coderplex Foundation is a registered non-profit organization that is working towards improving the state of
            tech in India.
          </Paragraph>
          <Paragraph>
            We manage one of the largest and most active developer community in India and organize free meetups and
            educational programs on a spectrum of modern technologies. We also help our community members get hired by
            tech companies.
          </Paragraph>
          <Paragraph>
            By making a donation to us, you will be directly supporting our work and help countless people from India
            learn and build their career in tech. You are free to choose whatever amount you would like to donate to us!
          </Paragraph>
          <Paragraph>We truly appreciate your generosity :D</Paragraph>
          <H2>Tax exemption details</H2>
          <Paragraph>
            We currently do not provide tax exemption certificate for the amount you donate. But we will be able to very
            soon!
          </Paragraph>
          <FindUs />
          <ContactUs />
        </Section>
        <Section className="md:flex-1 hidden md:block">
          <div className="shadow bg-white p-4 m-4 mt-6 rounded-lg">
            <PaymentForm />
          </div>
        </Section>
      </Container>
      <MobileFooter />
    </>
  );
}
