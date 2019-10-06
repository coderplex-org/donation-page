import FindUs from '../../components/FindUs';
import ContactUs from '../../components/ContactUs';
import PaymentForm from '../../components/PaymentForm';
import MobileFooter from '../../components/Footer';
import SEO from '../../components/SEO';
import { Header, Section, Container } from '../../components/Layout';
import CampaignDetails from '../../components/CampaignDetails';
import { fetchRecords, insertRecord } from '../../services/crowdfund';
import { CAMPAIGNS_ROUTE, FUNDINGS_ROUTE } from '../../constants';
import FundingsList from '../../components/FundingsList';
import { Loading, ErrorComponent } from '../../components/common';

export default class CrowdfundDetail extends React.Component {
  state = {
    campaign: {},
    fundings: [],
    raised: 0,
  };

  static getInitialProps({ query }) {
    return query;
  }

  async componentDidMount() {
    const { campaign } = await fetchRecords(CAMPAIGNS_ROUTE, this.props.slug);
    if (campaign) {
      const { fundings } = await fetchRecords(FUNDINGS_ROUTE, this.props.slug);
      if (fundings !== 0) {
        const sum = fundings.reduce((sumSoFar, { amount }) => sumSoFar + amount, 0);
        this.setState({ campaign, fundings, loading: false, error: false, raised: sum });
      } else {
        console.error(`There are no fundings raised for campaign with slug: ${this.props.slug}`);
        this.setState({ fundings: [], loading: false, error: false, raised: 0 });
      }
    } else {
      console.error(new Error(`There was a problem fetching campaign with slug: ${this.props.slug}`));
      this.setState({ campaign: {}, loading: false, error: true });
    }
  }

  render() {
    const { campaign, raised, loading, error, fundings } = this.state;
    const paymentFormProps = {
      maxAmount: campaign.req_amount - raised,
      actionName: "Contribute",
      collectName: true,
      onSuccess: async data => insertRecord(FUNDINGS_ROUTE, this.props.slug, data)
    }
    return (
      <>
        <SEO title={campaign ? `Crowdfundind by Coderplex` : `Contribute to ${campaign.title} by Coderplex`} />
        <Header title="Coderplex Crowdfunding" />
        <Container className="max-w-6xl">
          <Container className="flex-col md:w-2/3">
            <Section className="py-4 md:w-100 md:flex-1">
              <CampaignDetails campaign={campaign} raised={raised} loading={loading} error={error} />
            </Section>
          </Container>
          <Container className="flex-col md:w-1/3">
            <Section className="md:flex-1 md:block">
              <div className="shadow md:flex-1 hidden md:block bg-white p-4 m-4 mt-6 rounded-lg">
                {loading ? (
                  <Loading />
                ) : campaign.req_amount ? (
                  <PaymentForm {...paymentFormProps} />
                ) : (
                  error && <ErrorComponent />
                )}
              </div>
              <div className="shadow bg-white p-4 m-4 mt-6 rounded-lg">
                {loading ? <Loading /> : !error ? <FundingsList fundings={fundings} /> : <ErrorComponent />}
              </div>
            </Section>
          </Container>
        </Container>
        <Container>
          <FindUs />
          <ContactUs />
        </Container>
        <MobileFooter paymentFormProps={paymentFormProps} />
      </>
    );
  }
}
