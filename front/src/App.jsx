import Home from "./pages/Home/Home";
import Layout from "./components/common/Layout";

const App = () => {
    return (
        <Layout children={Home}>
            <Home/>
        </Layout>
    );
};

export default App;