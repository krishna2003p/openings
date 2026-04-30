import React from 'react';
import JobActionDropdown from './JobActionDropdown';
import ParseHTML from '../../common/parseHTML';

interface IEmployopeningstemProps {
  title: string;
  info: string;
  date: string;
  createdBy: any;
  status: string;
  openingsd?: string | undefined;
}

const Employopeningstem = ({
  title,
  info,
  date,
  status,
  openingsd,
  createdBy
}: IEmployopeningstemProps) => {
  return (
    <tr className={status}>
      <td>
        <div className="job-name fw-500">{title}</div>
        <div className="info1 d-none d-lg-block w-50">
          <ParseHTML
            data={info.length > 70 ? info.slice(0, 70) + '...' : info}
          />
        </div>
      </td>
      <td>{date}</td>

      <td>
        <div className="job-status text-capitalize">{status}</div>
      </td>
      <td>
        <div className="action-dots float-end">
          <button
            className="action-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
          </button>
          {/* action dropdown start */}
          <JobActionDropdown createdBy={createdBy._id} openingsd={openingsd} />
          {/* action dropdown end */}
        </div>
      </td>
    </tr>
  );
};

export default Employopeningstem;
