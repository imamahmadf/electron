import ReactDom from "react-dom";
import Routes from "./config/routes";
// import { ChakraProvider } from "@chakra-ui/react";

ReactDom.render(Routes, document.getElementById("app"));

// ReactDOM.createRoot(document.getElementById("app")).render(
//   <ChakraProvider>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </ChakraProvider>
// );
