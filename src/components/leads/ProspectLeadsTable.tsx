import React from 'react';

interface ProspectLead {
  id: string;
  business_name: string;
  contact_name: string;
  phone: string;
  website_url: string;
  gmb_status: string;
  website_quality: string;
  advertising_status: string;
  ad_quality: string;
  facebook_active: string;
  contact_method: string;
  lead_capacity: string;
  opportunity_summary: string;
  ambassador: string;
  created_at: string;
}

interface ProspectLeadsTableProps {
  prospects: ProspectLead[];
}

export const ProspectLeadsTable: React.FC<ProspectLeadsTableProps> = ({ prospects }) => {
  if (prospects.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No prospect leads submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ambassador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GMB Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prospects.map((prospect) => (
              <tr key={prospect.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{prospect.business_name}</div>
                  {prospect.website_url && (
                    <div className="text-sm text-blue-600">
                      <a href={prospect.website_url} target="_blank" rel="noopener noreferrer">
                        {prospect.website_url}
                      </a>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{prospect.contact_name || 'N/A'}</div>
                  {prospect.phone && (
                    <div className="text-sm text-gray-500">{prospect.phone}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{prospect.ambassador}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    prospect.gmb_status === 'Yes' ? 'bg-green-100 text-green-800' :
                    prospect.gmb_status === 'Unclaimed' ? 'bg-yellow-100 text-yellow-800' :
                    prospect.gmb_status === 'No' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {prospect.gmb_status || 'Unknown'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    prospect.lead_capacity === 'Yes' ? 'bg-green-100 text-green-800' :
                    prospect.lead_capacity === 'No' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {prospect.lead_capacity || 'Unknown'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(prospect.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      // Show prospect details in a modal or drawer
                      alert(`Opportunity Summary:\n\n${prospect.opportunity_summary}\n\nWebsite Quality: ${prospect.website_quality}\nAdvertising: ${prospect.advertising_status}\nFacebook: ${prospect.facebook_active}\nContact Method: ${prospect.contact_method}`);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
