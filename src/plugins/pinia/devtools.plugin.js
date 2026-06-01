export function devtoolsPlugin({ store }) {
  if (process.env.NODE_ENV === "development") {
    store._customProperties.add("hello");
  }
}
