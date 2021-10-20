import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { serverBaseUrl } from "../../config";

const Phishing = () => {
const { token } = useParams();
  useEffect(() => {
    const emailId = token.split('___')[0];
        axios.put(`${serverBaseUrl}/emails`,{ emailId }, {}).then(({ data }) => {
            console.log(data);
          })
          .catch((err) => {
              console.log('err');
          });
  }, [token]);
  return (
    <div className="phshing-container">
        <h1>You have been Phished :(</h1>
    </div>
  );
};

export default Phishing;
