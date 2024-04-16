import { ChatSection } from './Sections/chatSection/ChatSection';
import { Sidebar } from './Sections/sidebar/Sidebar';
import { SidebarProvider } from './context/SideBarContext';
import "./App.css"
import { ChatProvider } from './context/ChatSection';

function App() {
  return (
    <div className='App'>
      <SidebarProvider>
        <ChatProvider>
          <Sidebar />
          <ChatSection />
        </ChatProvider>
      </SidebarProvider>
    </div>
  );
}

export default App;
