import { ContactProvider } from "./context/ContactContext";
import ContactManager from "./components/ContactManager";
import ContactsGrid from "./components/ContactsGrid";
import DeleteConfirmation from "./components/DeleteConfirmationModal";
import ContactView from "./components/ContactViewModal";
import "./index.css";
import logo from "./asserts/logo.png";

const App = () => {
  return (
    <ContactProvider>
      <div className="app-container">
        <div className="app">
          {" "}
          <h1 className="title">Contact List</h1>{" "}
          <div className="header-container">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="mainLayout">
            {" "}
            <div className="contactsSection">
              {" "}
              <ContactsGrid />
            </div>
            <div className="formSection">
              {" "}
              <ContactManager />
            </div>
          </div>
          <DeleteConfirmation />
          <ContactView />
        </div>
      </div>
    </ContactProvider>
  );
};

export default App;
