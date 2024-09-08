import { createRoot } from "react-dom/client"; // Ubah impor ini
import Routes from "./config/routes";
import "bootstrap/dist/css/bootstrap.min.css";
// import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("app")).render(Routes);

// ReactDOM.createRoot(document.getElementById("app")).render(
//   <ChakraProvider>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </ChakraProvider>
// );
