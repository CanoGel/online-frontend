import { CSVLink } from 'react-csv';
import { FiDownload } from 'react-icons/fi';

const ExportButton = ({ data, filename, fields }) => {
  const headers = fields.map(field => ({
    label: field.split('.').pop().toUpperCase(),
    key: field
  }));

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={`${filename}-export-${new Date().toISOString().slice(0, 10)}.csv`}
      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
    >
      <FiDownload /> Export
    </CSVLink>
  );
};

export default ExportButton;