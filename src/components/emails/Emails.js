import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmails } from "../../slices/emailSlice";
import moment from "moment";

const EmailsPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchEmails())
  }, [dispatch]);
  const emailsLoading = useSelector(
    (state) => state.emailSlice.emailsLoading
  );
  const emails = useSelector(
    (state) => state.emailSlice.emails
  );
  const toLink = link => {
    window.open('http://'+link, "_blank")
  }

  return (
    <div className="emails-container">
        <h1>Emails page!</h1>
        {emailsLoading && <p>Loading emails...</p>}
        <div className="emails-wrapper" >
        {
          emails.map(({email, body, clicked, createdAt, url}, i) => {
            const status = clicked ? "Clicked" : "Didnt click"
            const time = moment(createdAt).format("YYYY-DD-MM HH:mm:ss");
            return (
             <div className="email-item" key={i}>
               <p>email: {email}</p>
               <p>body content: {body}</p>
               <p>status: {status}</p>
               <p>Created: {time}</p>
               <p>url: <button onClick={() => toLink(url)} >Link</button></p>
            </div>
            );
          })
        }
        </div>
    </div>
  );
};

export default EmailsPage;
