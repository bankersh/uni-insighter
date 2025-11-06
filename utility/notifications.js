const admin = require('firebase-admin');
const qry = require(`${PROJECT_DIR}/utility/selectQueries`);
const dtUtil = require(`${PROJECT_DIR}/utility/dateUtility`);

const serviceAccount = require('../push-notifications-65c64-firebase-adminsdk-hqsvg-9452ba59a5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://push-notifications-65c64.firebaseio.com',
});

module.exports = {
  sendnotificationToDevice,
  sendNotificationToMultipleDevices,
};

async function sendnotificationToDevice(pushNotification, notification, data = {}) {
 try {
    const { user__c, firebase_token__c } = pushNotification;

    // Save notification in DB (optional)
    const tableName = SF_NOTIFICATIONS_TABLE_NAME;
    const notifications = `user__c, title, body, createddate`;
    const notificationsValues = [
      user__c,
      notification.title,
      notification.body,
      dtUtil.todayDatetime(),
    ];
    qry.insertRecord(notifications, notificationsValues, tableName);

    // Prepare FCM message
    const message = {
      notification: {
        title: notification.title,
        body: notification.body,
      },
      data,
      token: firebase_token__c,
    };

    // Send notification
    const res = await admin.messaging().send(message);
    console.log('Notification sent successfully:', res);

  } catch (err) {
    console.log('Notification error:', err);

    // Log specific token-related errors
    if (
      err.code === 'messaging/registration-token-not-registered' ||
      err?.errorInfo?.code === 'messaging/registration-token-not-registered'
    ) {
      console.log('FCM token is not registered (may be uninstalled app or expired token).');
    }
  }
}

async function sendNotificationToMultipleDevices(tokens, notification, data = {}) {
  try {
    const res = await admin.messaging().sendMulticast({ tokens, notification, data });
    if (res.successCount) {
      console.log('Push notifiction sent successfully!');
    } else {
      console.log('Failed to send notifiction');
    }
  } catch (err) {
    console.log('Error in sendnotificationToDevice:', err);
  }
}
