import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';

const ticketData = [
  { id: 1, issue: 'Unable to login', status: 'Open' },
  { id: 2, issue: 'Page not loading', status: 'In Progress' },
  { id: 3, issue: 'Error on checkout', status: 'Resolved' }
];

// Function to determine the color of the Chip based on the status
const getStatusChipColor = (status) => {
  switch (status) {
    case 'Open':
      return 'error'; // red color
    case 'In Progress':
      return 'warning'; // yellow/orange color
    case 'Resolved':
      return 'success'; // green color
    default:
      return 'default'; // default grey color
  }
};

const TicketList = () => {
  return (
    <SubCard title="List of Created Tickets">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Issue</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketData.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.issue}</TableCell>
                <TableCell>
                  {/* Render status as a Chip with dynamic color */}
                  <Chip label={ticket.status} color={getStatusChipColor(ticket.status)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SubCard>
  );
};

export default TicketList;
