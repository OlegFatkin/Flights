import { TicketList } from './components/TicketList';
import { TicketProvider } from './provider/TicketProvider';

function App() {

  return (
    <div >
      <TicketProvider>
        <TicketList/>
     </TicketProvider>
    </div>
  );
}

export default App;
