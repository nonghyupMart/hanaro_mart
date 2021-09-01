import * as Sentry from "sentry-expo";
// import { RewriteFrames as RewriteFramesIntegration } from "@sentry/integrations";
import { SERVER_URL } from "../constants";
// import { Platform } from "react-native";

export const routingInstrumentation =
  new Sentry.Native.ReactNavigationV5Instrumentation();

Sentry.init({
  dsn: "https://f9dc315fd77b4b46886b29ceb067bcb3@o941457.ingest.sentry.io/5890267",
  enableInExpoDevelopment: false,
  debug: false, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      routingInstrumentation,
      beforeNavigate: (context) => {
        // Decide to not send a transaction by setting sampled = false
        if (context.data.route.name === "Do Not Send") {
          context.sampled = false;
        }

        // Modify the transaction context
        context.name = context.name.toUpperCase();
        context.tags = {
          ...context.tags,
          customTag: "value",
        };

        return context;
      },
      tracingOrigins: ["localhost", SERVER_URL, /^\//],
    }),
    // new RewriteFramesIntegration({
    //   iteratee: (frame) => {
    //     if (frame.filename) {
    //       // the values depend on what names you give the bundle files you are uploading to Sentry
    //       frame.filename =
    //         Platform.OS === "android"
    //           ? "app:///index.android.bundle"
    //           : "app:///main.jsbundle";
    //     }
    //     return frame;
    //   },
    // }),
  ],
  tracesSampleRate: 0.25,
});
