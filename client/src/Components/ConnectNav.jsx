import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAccountBalance } from "../service/stripe";

const ConnectNav = () => {
  const authState = useSelector((state) => state.authReducer);
  const [balance, setBalance] = useState(0);
  const { user } = authState;

  useEffect(
    () => {
      const accountBalance = async () => {
        let response = await getAccountBalance(authState.token);
        if (response) {
          setBalance(response);
        }
      };
      accountBalance();
    },
    // eslint-disable-next-line
    []
  );

  const currencyFormatter = (data) => {
    return (data.amount / 100).toLocaleString(data.currency, {
      style: "currency",
      currency: data.currency,
    });
  };

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Card.Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(
            user.createdAt
          ).fromNow()}`} /* return date as 6 days*/
        ></Card.Meta>
      </Card>
      {authState &&
        authState.user &&
        authState.user.stripeSeller &&
        authState.user.stripeSeller.charges_enabled && (
          <>
            <Badge.Ribbon text="Available" color="grey">
              <Card className="bg-light pt-1">
                {balance &&
                  balance.pending[0] &&
                  balance.pending.map((ba, i) => (
                    <span key={i} className="lead">
                      {currencyFormatter(ba)}
                    </span>
                  ))}
              </Card>
            </Badge.Ribbon>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
