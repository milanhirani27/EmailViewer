// ImapModule.java

package com.emailviewer;

import android.os.AsyncTask;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.mail.Folder;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Store;
import java.util.Properties;

public class ImapModule extends ReactContextBaseJavaModule {

    public ImapModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ImapModule";
    }

    @ReactMethod
    public void getEmailCount(String username, String password) {
        new EmailCountTask().execute(username, password);
    }

    private class EmailCountTask extends AsyncTask<String, Void, Integer> {

        @Override
        protected Integer doInBackground(String... params) {
            String username = params[0];
            String password = params[1];

            Properties properties = new Properties();
            properties.setProperty("mail.store.protocol", "imaps");
            properties.setProperty("mail.imaps.host", "imap.gmail.com");
            properties.setProperty("mail.imaps.port", "993");

            Session session = Session.getDefaultInstance(properties);

            try {
                Store store = session.getStore("imaps");
                store.connect(username, password);

                Folder inbox = store.getFolder("inbox");
                inbox.open(Folder.READ_ONLY);

                int count = inbox.getMessageCount();
                inbox.close(true);
                store.close();

                return count;
            } catch (MessagingException e) {
                Log.d("message", "222" + e);
                e.printStackTrace();
                return -1;
            }
        }

        @Override
        protected void onPostExecute(Integer result) {
            if (result != -1) {
                getReactApplicationContext()
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("emailCount", result);
            }
        }
    }
}
