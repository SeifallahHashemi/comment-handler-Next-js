import {Fragment, useContext} from 'react';

import MainHeader from './main-header';
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

function Layout(props) {
    const NotificationCtx = useContext(NotificationContext);
    const activeNotification = NotificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
        {activeNotification && (
            <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status}/>
        )}
    </Fragment>
  );
}

export default Layout;
