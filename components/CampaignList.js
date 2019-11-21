import React from 'react';

import { fetchRecords } from '../services/crowdfund';
import CampaignItem from './CampaignItem';
import { CAMPAIGNS_ROUTE } from '../constants';

export default class CampaignList extends React.Component {
  state = {
    error: false,
    loading: true,
    campaigns: [],
  };

  async componentDidMount() {
    const { campaigns } = await fetchRecords(CAMPAIGNS_ROUTE);
    if (campaigns.length !== 0) {
      this.setState({ campaigns, loading: false, error: false });
    } else {
      console.error(new Error('There was a problem fetching all active campaigns'));
      this.setState({ campaigns: [], loading: false, error: true });
    }
  }

  render() {
    const { loading, error, campaigns } = this.state;
    return (
      <div className="text-center">
        {loading ? (
          <Loading />
        ) : campaigns.length === 0 || error ? (
          <ErrorComponent />
        ) : (
          campaigns.map((campaign, key) => <CampaignItem key={key} {...campaign} />)
        )}
      </div>
    );
  }
}
