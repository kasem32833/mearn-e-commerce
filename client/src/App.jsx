import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/oders";
import AdminFeatures from "./pages/admin-view/admin-features";
import ShopingLayout from "./components/shoping-view/layout";
import NotFound from "./pages/not-found";
import ShopingListing from "./pages/shopping-view/listing";
import Shopingcheckout from "./pages/shopping-view/checkout";
import ShopingAccount from "./pages/shopping-view/account";
import ShopingHome from "./pages/shopping-view/home";
import CheckAuth from "./components/common/check-auth";
import UnAuth from "./pages/un-auth";

function App() {


  const isAuthenticated = false;
  const user =  {
    name: "abul",
    role: "user"
  }


  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common component */}
      <h1>Header component</h1>
      <Routes>
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user} ><AuthLayout /></CheckAuth>}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShopingLayout /></CheckAuth>}>
          <Route path="home" element={<ShopingHome />} />
          <Route path="listing" element={<ShopingListing />} />
          <Route path="checkout" element={<Shopingcheckout />} />
          <Route path="account" element={<ShopingAccount />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/un-auth" element={<UnAuth />}></Route>
      </Routes>
    </div>
  );
}

export default App;
