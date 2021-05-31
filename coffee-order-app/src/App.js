import { CoffeeOrder } from "./coffee-order/component";
import { useDispatch } from "react-redux";
import { getOrders } from "./coffee-order/actions/index";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <CoffeeOrder />;
}

export default App;
